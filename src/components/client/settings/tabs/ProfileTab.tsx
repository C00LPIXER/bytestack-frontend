import { User } from "@/types/user";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, X } from "lucide-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "@/service/client/api/clientApi";
import { toast } from "sonner";
import { setUser } from "@/redux/slices/authSlice";
import { ErrorResponse } from "@/types/error";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { profileSchema } from "@/utils/validation/schemas";

interface ProfileTabProps {
  profile: User;
}

export const ProfileTab = ({ profile }: ProfileTabProps) => {
  const dispatch = useDispatch();
  const [showUpdateButton, setShowUpdateButton] = useState(false);
  const [showTopicInput, setShowTopicInput] = useState(false);
  const [newTopic, setNewTopic] = useState("");

  const predefinedTopics = [
    "React",
    "TypeScript",
    "Node.js",
    "Python",
    "Machine Learning",
    "DevOps",
    "AWS",
    "GraphQL",
    "Rust",
    "Blockchain",
  ];

  const updateMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (response) => {
      if (response.success) {
        dispatch(setUser(response.data));
        toast.success(response.message);
      }
    },
    onError: (error: ErrorResponse) => {
      toast.error(error.response?.data?.message);
    },
  });

  return (
    <Formik
      initialValues={{
        name: profile.name,
        headline: profile.headline || "",
        bio: profile.bio || "",
        links: profile.links || [],
        techInterests: profile.techInterests?.slice(0, 10) || [],
        avatar: profile.avatar || "",
      }}
      validationSchema={profileSchema}
      onSubmit={(values) => {
        const updatedProfile: Partial<User> = Object.fromEntries(
          Object.entries(values).filter(
            ([key, value]) => value !== profile[key as keyof User]
          )
        );
        updateMutation.mutate(updatedProfile);
        setShowUpdateButton(false);
      }}
    >
      {({ values, setFieldValue, dirty }) => (
        <Form className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="w-24 h-24 border-4 border-white dark:border-gray-700 shadow-md">
                <AvatarImage src={values.avatar} alt={values.name} />
                <AvatarFallback className="text-3xl">
                  {values.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="imageUpload"
                onChange={(event) => {
                  if (event.target.files && event.target.files[0]) {
                    const file = event.target.files[0];
                    const imageUrl = URL.createObjectURL(file);
                    setFieldValue("avatar", imageUrl);
                    setShowUpdateButton(true);
                  }
                }}
              />
              <Button
                variant="outline"
                className="flex items-center gap-2"
                type="button"
                onClick={() => document.getElementById("imageUpload")?.click()}
              >
                <Upload className="h-4 w-4" /> Change Avatar
              </Button>
              <ErrorMessage
                name="avatar"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Display Name</Label>
                <Field
                  as={Input}
                  id="name"
                  name="name"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFieldValue("name", e.target.value);
                    setShowUpdateButton(true);
                  }}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="displayEmail">Email</Label>
                <Input disabled id="displayEmail" value={profile.email} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="headline">Headline</Label>
                <Field
                  as={Input}
                  id="headline"
                  name="headline"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFieldValue("headline", e.target.value);
                    setShowUpdateButton(true);
                  }}
                />
                <ErrorMessage
                  name="headline"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label>Links</Label>
                <br />
                {values.links.map((_, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <Field
                      as={Input}
                      placeholder="URL"
                      name={`links[${index}]`}
                      className="flex-1"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue(`links[${index}]`, e.target.value);
                        setShowUpdateButton(true);
                      }}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      type="button"
                      onClick={() => {
                        setFieldValue(
                          "links",
                          values.links.filter((_, i) => i !== index)
                        );
                        setShowUpdateButton(true);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <ErrorMessage
                      name={`links[${index}]`}
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                ))}
                {values.links.length < 3 && (
                  <Button
                    variant="outline"
                    size="sm"
                    type="button"
                    onClick={() => {
                      setFieldValue("links", [...values.links, ""]);
                      setShowUpdateButton(true);
                    }}
                  >
                    + Add Link
                  </Button>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Field
                  as={Textarea}
                  id="bio"
                  name="bio"
                  rows={4}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    setFieldValue("bio", e.target.value);
                    setShowUpdateButton(true);
                  }}
                />
                <ErrorMessage
                  name="bio"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label>Interested Topics</Label>
                <div className="flex flex-wrap gap-2">
                  {values.techInterests.map((topic, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="pl-2 pr-1 py-1 flex items-center gap-1"
                    >
                      <span>{topic}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 rounded-full"
                        type="button"
                        onClick={() => {
                          setFieldValue(
                            "techInterests",
                            values.techInterests.filter((t) => t !== topic)
                          );
                          setShowUpdateButton(true);
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                  {!showTopicInput && (
                    <Button
                      variant="outline"
                      size="sm"
                      type="button"
                      onClick={() => setShowTopicInput(true)}
                    >
                      + Add Topic
                    </Button>
                  )}
                  {showTopicInput && (
                    <div className="flex gap-2">
                      <select
                        value={newTopic}
                        onChange={(e) => setNewTopic(e.target.value)}
                        className="border rounded p-1"
                      >
                        <option value="">Select a topic</option>
                        {predefinedTopics.map((topic) => (
                          <option key={topic} value={topic}>
                            {topic}
                          </option>
                        ))}
                      </select>
                      <Button
                        type="button"
                        onClick={() => {
                          if (
                            newTopic &&
                            !values.techInterests.includes(newTopic) &&
                            values.techInterests.length < 10
                          ) {
                            setFieldValue("techInterests", [
                              ...values.techInterests,
                              newTopic,
                            ]);
                            setNewTopic("");
                            setShowTopicInput(false);
                            setShowUpdateButton(true);
                          }
                        }}
                      >
                        Add
                      </Button>
                      <Button
                        variant="ghost"
                        type="button"
                        onClick={() => {
                          setNewTopic("");
                          setShowTopicInput(false);
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
                <ErrorMessage
                  name="techInterests"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              {(showUpdateButton || dirty) && (
                <Button className="w-full" type="submit">
                  Update Profile
                </Button>
              )}
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
