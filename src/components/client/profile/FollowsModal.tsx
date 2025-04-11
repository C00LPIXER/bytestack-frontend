import { useEffect, useState, useCallback } from "react";
import {
  Dialog,
  DialogDescription,
  DialogContent,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { getFollows } from "@/service/client/api/clientApi";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import Follows from "./Follows";

// Type definitions
interface User {
  _id: string;
  name: string;
  avatar: string;
  slug: string;
  isFollower: boolean;
  isFollowing: boolean;
}

interface FollowsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  initialTab?: "followers" | "followings";
}

const PAGE_SIZE = 10;

// User Item Component
const UserItem = ({ user }: { user: User }) => (
  <div className="flex items-center gap-3 p-3 dark:hover:bg-[#ffffff23] hover:bg-gray-100">
    <Avatar>
      <AvatarImage src={user.avatar} alt={user.name} />
      <AvatarFallback>{user.name[0]}</AvatarFallback>
    </Avatar>
    <div className="flex-1">
      <p className="font-medium">{user.name}</p>
      <p className="text-sm text-gray-500">@{user.slug}</p>
    </div>
    <Follows
      id={user._id}
      size="sm"
      isFollowing={user.isFollowing}
      isFollower={user.isFollower}
      className="ml-2 text-xs whitespace-nowrap"
    />
  </div>
);

export const FollowsModal = ({
  isOpen,
  onClose,
  userId,
  initialTab = "followers",
}: FollowsModalProps) => {
  const [activeTab, setActiveTab] = useState<"followers" | "followings">(
    initialTab
  );
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [page, setPage] = useState(1);
  const [allFollowers, setAllFollowers] = useState<User[]>([]);
  const [allFollowings, setAllFollowings] = useState<User[]>([]);

  // Query for followers
  const {
    data: followersData,
    isFetching: isLoadingFollowers,
    isError: isErrorFollowers,
    error: followersError,
    refetch: refetchFollowers,
  } = useQuery<User[]>({
    queryKey: ["followers", userId, debouncedSearchQuery, page],
    queryFn: () =>
      getFollows("followers", debouncedSearchQuery, page, PAGE_SIZE).then(
        (res) => {
          console.log("Followers data received for page", page, ":", res);
          return res as User[];
        }
      ),
    enabled: false, // Disable initial fetch
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  // Query for followings
  const {
    data: followingsData,
    isFetching: isLoadingFollowings,
    isError: isErrorFollowings,
    error: followingsError,
    refetch: refetchFollowings,
  } = useQuery<User[]>({
    queryKey: ["followings", userId, debouncedSearchQuery, page],
    queryFn: () =>
      getFollows("followings", debouncedSearchQuery, page, PAGE_SIZE).then(
        (res) => {
          console.log("Followings data received for page", page, ":", res);
          return res as User[];
        }
      ),
    enabled: false, // Disable initial fetch
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  // Update accumulated data when new data is fetched
  useEffect(() => {
    if (followersData && activeTab === "followers") {
      setAllFollowers((prev) => {
        const newUsers = followersData.filter(
          (newUser) => !prev.some((user) => user._id === newUser._id)
        );
        console.log("New followers added for page", page, ":", newUsers);
        return page === 1 ? followersData : [...prev, ...newUsers]; // Reset on page 1, append otherwise
      });
    }
  }, [followersData, activeTab, page]);

  useEffect(() => {
    if (followingsData && activeTab === "followings") {
      setAllFollowings((prev) => {
        const newUsers = followingsData.filter(
          (newUser) => !prev.some((user) => user._id === newUser._id)
        );
        console.log("New followings added for page", page, ":", newUsers);
        return page === 1 ? followingsData : [...prev, ...newUsers]; // Reset on page 1, append otherwise
      });
    }
  }, [followingsData, activeTab, page]);

  // Initial fetch or refetch on tab change/search
  const fetchInitialData = useCallback(() => {
    if (activeTab === "followers") {
      refetchFollowers();
    } else if (activeTab === "followings") {
      refetchFollowings();
    }
  }, [activeTab, refetchFollowers, refetchFollowings]);

  useEffect(() => {
    if (isOpen) {
      setAllFollowers([]);
      setAllFollowings([]);
      setPage(1);
      fetchInitialData(); // Trigger fetch when modal opens
    }
  }, [isOpen, fetchInitialData]);

  useEffect(() => {
    if (debouncedSearchQuery || activeTab !== initialTab) {
      setPage(1); // Reset page on search or tab change
      fetchInitialData(); // Refetch with new search or tab
    }
  }, [debouncedSearchQuery, activeTab, initialTab, fetchInitialData]);

  // Handle page change (manual pagination)
  const handleNextPage = useCallback(() => {
    console.log("Attempting to load more for", activeTab, "at page", page);
    if (
      (followersData?.length === PAGE_SIZE &&
        activeTab === "followers" &&
        !isLoadingFollowers) ||
      (followingsData?.length === PAGE_SIZE &&
        activeTab === "followings" &&
        !isLoadingFollowings)
    ) {
      console.log("Loading next page for", activeTab, "to", page + 1);
      setPage((prev) => prev + 1);
    } else {
      console.log("No more data or still fetching for", activeTab);
    }
  }, [
    activeTab,
    followersData,
    followingsData,
    isLoadingFollowers,
    isLoadingFollowings,
    page,
  ]);

  // Handle tab change
  const handleTabChange = (value: string) => {
    const newTab = value as "followers" | "followings";
    setActiveTab(newTab);
    setSearchQuery(""); // Reset search when switching tabs
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogDescription className="sr-only">
          Followers and Following list
        </DialogDescription>
        <Tabs
          value={activeTab}
          className="w-full pt-4"
          onValueChange={handleTabChange}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="followers">Followers</TabsTrigger>
            <TabsTrigger value="followings">Followings</TabsTrigger>
          </TabsList>
          <div className="pt-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>

          <TabsContent value="followers">
            <ScrollArea className="h-[400px] w-full">
              {allFollowers.length === 0 && !isLoadingFollowers && (
                <p className="p-3 text-center text-gray-500">
                  No followers found
                </p>
              )}
              {allFollowers.map((user) => (
                <UserItem key={user._id} user={user} />
              ))}
              {isLoadingFollowers && (
                <p className="p-3 text-center">Loading...</p>
              )}
              {isErrorFollowers && (
                <p className="p-3 text-center text-red-500">
                  Error: {(followersError as Error)?.message}
                </p>
              )}
              {followersData?.length === PAGE_SIZE && !isLoadingFollowers && (
                <button
                  onClick={handleNextPage}
                  className="w-full py-2 text-center text-blue-500 hover:underline"
                >
                  Load More
                </button>
              )}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="followings">
            <ScrollArea className="h-[400px] w-full">
              {allFollowings.length === 0 && !isLoadingFollowings && (
                <p className="p-3 text-center text-gray-500">
                  No followings found
                </p>
              )}
              {allFollowings.map((user) => (
                <UserItem key={user._id} user={user} />
              ))}
              {isLoadingFollowings && (
                <p className="p-3 text-center">Loading...</p>
              )}
              {isErrorFollowings && (
                <p className="p-3 text-center text-red-500">
                  Error: {(followingsError as Error)?.message}
                </p>
              )}
              {followingsData?.length === PAGE_SIZE && !isLoadingFollowings && (
                <button
                  onClick={handleNextPage}
                  className="w-full py-2 text-center text-blue-500 hover:underline"
                >
                  Load More
                </button>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
