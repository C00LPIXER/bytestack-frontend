import { useEffect, useCallback, useState } from "react";
import {
  Dialog,
  DialogDescription,
  DialogContent,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import Follows from "./Follows";
import { getFollows } from "@/service/client/api/clientApi";

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
  // userId: string;
  initialTab?: "followers" | "followings";
}

interface FetchTrigger {
  type: "followers" | "followings";
  query: string;
  page: number;
  append: boolean;
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
  // userId,
  initialTab = "followers",
}: FollowsModalProps) => {
  const [activeTab, setActiveTab] = useState<"followers" | "followings">(
    initialTab
  );
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [allFollowers, setAllFollowers] = useState<User[]>([]);
  const [allFollowings, setAllFollowings] = useState<User[]>([]);
  const [followersPage, setFollowersPage] = useState(1);
  const [followingsPage, setFollowingsPage] = useState(1);
  const [isLoadingFollowers, setIsLoadingFollowers] = useState(false);
  const [isLoadingFollowings, setIsLoadingFollowings] = useState(false);
  const [errorFollowers, setErrorFollowers] = useState<string | null>(null);
  const [errorFollowings, setErrorFollowings] = useState<string | null>(null);
  const [fetchTrigger, setFetchTrigger] = useState<FetchTrigger | null>(null);

  // Fetch data function
  const fetchData = useCallback(
    async (
      type: "followers" | "followings",
      query: string,
      page: number,
      append: boolean
    ) => {
      try {
        if (type === "followers") {
          setIsLoadingFollowers(true);
          setErrorFollowers(null);
        } else {
          setIsLoadingFollowings(true);
          setErrorFollowings(null);
        }

        console.log(`Fetching ${type} for page ${page} with query "${query}"`);
        const data = await getFollows(type, query, page, PAGE_SIZE);
        console.log(`Fetched ${type} for page ${page}:`, data);

        const users = Array.isArray(data) ? data : []; // Ensure data is an array

        if (type === "followers") {
          setAllFollowers((prev) => {
            const newUsers = users.filter(
              (newUser: User) => !prev.some((user) => user._id === newUser._id)
            );
            const updated = append && page > 1 ? [...prev, ...newUsers] : users;
            console.log(`Updated allFollowers to ${updated.length} items`);
            return updated;
          });
        } else {
          setAllFollowings((prev) => {
            const newUsers = users.filter(
              (newUser: User) => !prev.some((user) => user._id === newUser._id)
            );
            const updated = append && page > 1 ? [...prev, ...newUsers] : users;
            console.log(`Updated allFollowings to ${updated.length} items`);
            return updated;
          });
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch data";
        console.error(`Error fetching ${type}:`, errorMessage);
        if (type === "followers") {
          setErrorFollowers(errorMessage);
        } else {
          setErrorFollowings(errorMessage);
        }
      } finally {
        if (type === "followers") {
          setIsLoadingFollowers(false);
        } else {
          setIsLoadingFollowings(false);
        }
      }
    },
    []
  );

  // Single fetch effect
  useEffect(() => {
    if (isOpen && fetchTrigger) {
      console.log("Fetch triggered:", fetchTrigger);
      fetchData(
        fetchTrigger.type,
        fetchTrigger.query,
        fetchTrigger.page,
        fetchTrigger.append
      );
    }
  }, [isOpen, fetchTrigger, fetchData]);

  // Handle modal open
  useEffect(() => {
    if (isOpen) {
      console.log("Modal opened, initializing data for", initialTab);
      setAllFollowers([]);
      setAllFollowings([]);
      setFollowersPage(1);
      setFollowingsPage(1);
      setSearchQuery("");
      setFetchTrigger({ type: initialTab, query: "", page: 1, append: false });
    }
  }, [isOpen, initialTab]);

  // Handle tab change
  const handleTabChange = (value: string) => {
    const newTab = value as "followers" | "followings";
    setActiveTab(newTab);
    setSearchQuery(""); // Reset search when switching tabs
    if (newTab === "followers") {
      setAllFollowers([]);
      setFollowersPage(1);
      setFetchTrigger({ type: "followers", query: "", page: 1, append: false });
    } else {
      setAllFollowings([]);
      setFollowingsPage(1);
      setFetchTrigger({
        type: "followings",
        query: "",
        page: 1,
        append: false,
      });
    }
  };

  // Handle search query changes
  useEffect(() => {
    if (isOpen) {
      console.log("Search query changed to", debouncedSearchQuery);
      if (activeTab === "followers") {
        setAllFollowers([]);
        setFollowersPage(1);
        setFetchTrigger({
          type: "followers",
          query: debouncedSearchQuery,
          page: 1,
          append: false,
        });
      } else if (activeTab === "followings") {
        setAllFollowings([]);
        setFollowingsPage(1);
        setFetchTrigger({
          type: "followings",
          query: debouncedSearchQuery,
          page: 1,
          append: false,
        });
      }
    }
  }, [debouncedSearchQuery, activeTab, isOpen]);

  // Handle next page
  const handleNextPage = useCallback(() => {
    if (activeTab === "followers" && !isLoadingFollowers) {
      const nextPage = followersPage + 1;
      console.log("Loading more followers, page", nextPage);
      setFollowersPage(nextPage);
      setFetchTrigger({
        type: "followers",
        query: debouncedSearchQuery,
        page: nextPage,
        append: true,
      });
    } else if (activeTab === "followings" && !isLoadingFollowings) {
      const nextPage = followingsPage + 1;
      console.log("Loading more followings, page", nextPage);
      setFollowingsPage(nextPage);
      setFetchTrigger({
        type: "followings",
        query: debouncedSearchQuery,
        page: nextPage,
        append: true,
      });
    }
  }, [
    activeTab,
    followersPage,
    followingsPage,
    isLoadingFollowers,
    isLoadingFollowings,
    debouncedSearchQuery,
  ]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogDescription className="sr-only">
          Followers and Followings list
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
              {allFollowers.length === 0 &&
                !isLoadingFollowers &&
                !errorFollowers && (
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
              {errorFollowers && (
                <p className="p-3 text-center text-red-500">
                  Error: {errorFollowers}
                </p>
              )}
              {allFollowers.length >= PAGE_SIZE &&
                !isLoadingFollowers &&
                !errorFollowers && (
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
              {allFollowings.length === 0 &&
                !isLoadingFollowings &&
                !errorFollowings && (
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
              {errorFollowings && (
                <p className="p-3 text-center text-red-500">
                  Error: {errorFollowings}
                </p>
              )}
              {allFollowings.length >= PAGE_SIZE &&
                !isLoadingFollowings &&
                !errorFollowings && (
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
