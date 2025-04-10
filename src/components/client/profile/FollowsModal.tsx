import { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogDescription,
  DialogContent,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

// Type definitions
interface User {
  _id: string;
  name: string;
  avatar: string;
  slug: string;
}

interface ApiResponse {
  data: User[];
  hasMore: boolean;
  total: number;
}

interface FollowsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

// Static data with 20 example users
const mockUsers: User[] = [
  {
    _id: "1",
    name: "John Doe",
    avatar: "https://example.com/john.png",
    slug: "johndoe",
  },
  {
    _id: "2",
    name: "Jane Smith",
    avatar: "https://example.com/jane.png",
    slug: "janesmith",
  },
  {
    _id: "3",
    name: "Mike Johnson",
    avatar: "https://example.com/mike.png",
    slug: "mikej",
  },
  {
    _id: "4",
    name: "Sarah Williams",
    avatar: "https://example.com/sarah.png",
    slug: "sarahw",
  },
  {
    _id: "5",
    name: "Tom Brown",
    avatar: "https://example.com/tom.png",
    slug: "tombrown",
  },
  {
    _id: "6",
    name: "Emily Davis",
    avatar: "https://example.com/emily.png",
    slug: "emilyd",
  },
  {
    _id: "7",
    name: "Alex Wilson",
    avatar: "https://example.com/alex.png",
    slug: "alexw",
  },
  {
    _id: "8",
    name: "Lisa Anderson",
    avatar: "https://example.com/lisa.png",
    slug: "lisaa",
  },
  {
    _id: "9",
    name: "David Lee",
    avatar: "https://example.com/david.png",
    slug: "davidlee",
  },
  {
    _id: "10",
    name: "Kelly White",
    avatar: "https://example.com/kelly.png",
    slug: "kellyw",
  },
  {
    _id: "11",
    name: "Chris Taylor",
    avatar: "https://example.com/chris.png",
    slug: "christ",
  },
  {
    _id: "12",
    name: "Rachel Moore",
    avatar: "https://example.com/rachel.png",
    slug: "rachelm",
  },
  {
    _id: "13",
    name: "Peter Clark",
    avatar: "https://example.com/peter.png",
    slug: "peterc",
  },
  {
    _id: "14",
    name: "Anna Martinez",
    avatar: "https://example.com/anna.png",
    slug: "annam",
  },
  {
    _id: "15",
    name: "James Thompson",
    avatar: "https://example.com/james.png",
    slug: "jamest",
  },
  {
    _id: "16",
    name: "Michelle Garcia",
    avatar: "https://example.com/michelle.png",
    slug: "michelleg",
  },
  {
    _id: "17",
    name: "Robert Jackson",
    avatar: "https://example.com/robert.png",
    slug: "robertj",
  },
  {
    _id: "18",
    name: "Sophie Turner",
    avatar: "https://example.com/sophie.png",
    slug: "sophiet",
  },
  {
    _id: "19",
    name: "William Parker",
    avatar: "https://example.com/william.png",
    slug: "willp",
  },
  {
    _id: "20",
    name: "Emma Roberts",
    avatar: "https://example.com/emma.png",
    slug: "emmar",
  },
];

// Simplified data fetch function
const fetchFollowData = (
  userId: string,
  type: "followers" | "following",
  page: number,
  limit: number = 10
): ApiResponse => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedData = mockUsers.slice(startIndex, endIndex);
  const hasMore = endIndex < mockUsers.length;

  return {
    data: paginatedData,
    hasMore: hasMore,
    total: mockUsers.length,
  };
};

// User Item Component
const UserItem = ({ user }: { user: User }) => (
  <div className="flex items-center gap-3 p-3 dark:hover:bg-[#ffffff23] hover:bg-gray-100">
    <Avatar>
      <AvatarImage src={user.avatar} alt={user.name} />
      <AvatarFallback>{user.name[0]}</AvatarFallback>
    </Avatar>
    <div>
      <p className="font-medium">{user.name}</p>
      <p className="text-sm text-gray-500">@{user.slug}</p>
    </div>
  </div>
);

export const FollowsModal = ({
  isOpen,
  onClose,
  userId,
}: FollowsModalProps) => {
  const [followers, setFollowers] = useState<User[]>([]);
  const [following, setFollowing] = useState<User[]>([]);
  const [followersPage, setFollowersPage] = useState(1);
  const [followingPage, setFollowingPage] = useState(1);
  const [hasMoreFollowers, setHasMoreFollowers] = useState(true);
  const [hasMoreFollowing, setHasMoreFollowing] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Load data
  const loadMoreData = useCallback(
    (type: "followers" | "following", page: number) => {
      if (
        isLoading ||
        (!hasMoreFollowers && type === "followers") ||
        (!hasMoreFollowing && type === "following")
      ) {
        return;
      }

      setIsLoading(true);
      const data = fetchFollowData(userId, type, page);

      if (type === "followers") {
        setFollowers((prev) => [...prev, ...data.data]);
        setHasMoreFollowers(data.hasMore);
        setFollowersPage(page);
      } else {
        setFollowing((prev) => [...prev, ...data.data]);
        setHasMoreFollowing(data.hasMore);
        setFollowingPage(page);
      }
      setIsLoading(false);
    },
    [userId, isLoading, hasMoreFollowers, hasMoreFollowing]
  );

  // Initial load
  useEffect(() => {
    if (isOpen) {
      setFollowers([]);
      setFollowing([]);
      setFollowersPage(1);
      setFollowingPage(1);
      setHasMoreFollowers(true);
      setHasMoreFollowing(true);
      loadMoreData("followers", 1);
      loadMoreData("following", 1);
    }
  }, [isOpen, loadMoreData]);

  // Handle scroll
  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>, type: "followers" | "following") => {
      const target = e.target as HTMLDivElement;
      const bottom =
        target.scrollHeight - target.scrollTop <= target.clientHeight + 100;

      if (bottom && !isLoading) {
        const nextPage =
          type === "followers" ? followersPage + 1 : followingPage + 1;
        loadMoreData(type, nextPage);
      }
    },
    [followersPage, followingPage, isLoading, loadMoreData]
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogDescription className="sr-only">
          Followers and Following list
        </DialogDescription>
        <Tabs defaultValue="followers" className="w-full pt-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="followers">Followers</TabsTrigger>
            <TabsTrigger value="following">Following</TabsTrigger>
          </TabsList>

          <TabsContent value="followers">
            <ScrollArea
              className="h-[400px] w-ful"
              onScroll={(e) => handleScroll(e, "followers")}
            >
              {followers.map((user) => (
                <UserItem key={user._id} user={user} />
              ))}
              {isLoading && <p className="p-3 text-center">Loading...</p>}
              {!hasMoreFollowers && followers.length > 0 && (
                <p className="p-3 text-center text-gray-500">
                  No more followers to load
                </p>
              )}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="following">
            <ScrollArea
              className="h-[400px] w-full"
              onScroll={(e) => handleScroll(e, "following")}
            >
              {following.map((user) => (
                <UserItem key={user._id} user={user} />
              ))}
              {isLoading && <p className="p-3 text-center">Loading...</p>}
              {!hasMoreFollowing && following.length > 0 && (
                <p className="p-3 text-center text-gray-500">
                  No more following to load
                </p>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
