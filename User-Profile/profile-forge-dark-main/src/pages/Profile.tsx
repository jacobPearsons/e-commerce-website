import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Camera,
  Edit3,
  MapPin,
  Calendar,
  Globe,
  Linkedin,
  Twitter,
  Github,
  Mail,
  Phone,
  Plus,
  X,
  Save,
  Star,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  bio: z.string().max(500, "Bio must be less than 500 characters"),
  location: z.string().optional(),
  website: z.string().url().optional().or(z.literal("")),
  linkedin: z.string().optional(),
  twitter: z.string().optional(),
  github: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface Skill {
  id: string;
  name: string;
  endorsementCount: number;
  level: number;
}

const mockSkills: Skill[] = [
  { id: "1", name: "Product Design", endorsementCount: 24, level: 90 },
  { id: "2", name: "User Research", endorsementCount: 18, level: 85 },
  { id: "3", name: "Prototyping", endorsementCount: 15, level: 80 },
  { id: "4", name: "Data Analysis", endorsementCount: 12, level: 75 },
  { id: "5", name: "Leadership", endorsementCount: 20, level: 88 },
];

const Profile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [skills, setSkills] = useState<Skill[]>(mockSkills);
  const [newSkill, setNewSkill] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      username: user?.username || "",
      bio: user?.bio || "",
      location: "",
      website: "",
      linkedin: "",
      twitter: "",
      github: "",
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    try {
      await updateProfile(data);
      setIsEditing(false);
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      toast({
        title: "Update failed",
        description: "There was an error updating your profile.",
        variant: "destructive",
      });
    }
  };

  const handleCancelEdit = () => {
    reset();
    setIsEditing(false);
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      const skill: Skill = {
        id: Date.now().toString(),
        name: newSkill.trim(),
        endorsementCount: 0,
        level: 70,
      };
      setSkills([...skills, skill]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillId: string) => {
    setSkills(skills.filter((skill) => skill.id !== skillId));
  };

  const endorseSkill = (skillId: string) => {
    setSkills(
      skills.map((skill) =>
        skill.id === skillId
          ? { ...skill, endorsementCount: skill.endorsementCount + 1 }
          : skill
      )
    );
  };

  // Fix createdAt: safely parse into a Date if it's a string
  const joinedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString()
    : "N/A";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 bg-white text-blue-900 p-6 rounded-2xl shadow-md"
    >
      {/* Profile Header */}
      <Card className="overflow-hidden bg-white border border-blue-200 shadow-lg">
        <div className="relative h-32 bg-blue-600">
          <Button
            variant="secondary"
            size="sm"
            className="absolute top-4 right-4 bg-blue-700 text-white hover:bg-blue-800"
          >
            <Camera className="h-4 w-4 mr-2" />
            Change Cover
          </Button>
        </div>

        <CardContent className="relative -mt-16 pb-6">
          <div className="flex flex-col md:flex-row md:items-end md:space-x-6">
            <div className="relative">
              <Avatar className="h-32 w-32 border-4 border-white shadow-md">
                <AvatarImage src={user?.avatarUrl} alt={user?.name} />
                <AvatarFallback className="text-2xl bg-blue-100 text-blue-700">
                  {user?.name?.split(" ").map((n) => n[0]).join("") || "U"}
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                className="absolute bottom-0 right-0 rounded-full h-8 w-8 p-0 bg-blue-600 text-white hover:bg-blue-700"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1 mt-4 md:mt-0">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold">{user?.name}</h1>
                  <p className="text-lg text-blue-600">@{user?.username}</p>
                  <p className="text-sm mt-2">{user?.bio}</p>
                </div>
                <Button
                  variant={isEditing ? "outline" : "default"}
                  className="bg-blue-600 text-white hover:bg-blue-700"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  {isEditing ? "Cancel" : "Edit Profile"}
                </Button>
              </div>

              <div className="flex items-center space-x-6 mt-4 text-sm text-blue-700">
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {joinedDate}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Globe className="h-4 w-4" />
                  <span>profilepro.dev</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Edit Profile Form */}
        {isEditing && (
          <div className="lg:col-span-2">
            <Card className="widget-card">
              <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
                <CardDescription>
                  Update your profile information to keep it current and engaging.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        {...register('name')}
                        className="bg-widget-bg border-glass-border"
                      />
                      {errors.name && (
                        <p className="text-sm text-destructive">{errors.name.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        {...register('username')}
                        className="bg-widget-bg border-glass-border"
                      />
                      {errors.username && (
                        <p className="text-sm text-destructive">{errors.username.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      {...register('bio')}
                      className="bg-widget-bg border-glass-border min-h-[100px]"
                      placeholder="Tell us about yourself..."
                    />
                    {errors.bio && (
                      <p className="text-sm text-destructive">{errors.bio.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        {...register('location')}
                        className="bg-widget-bg border-glass-border"
                        placeholder="City, Country"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        {...register('website')}
                        className="bg-widget-bg border-glass-border"
                        placeholder="https://yourwebsite.com"
                      />
                      {errors.website && (
                        <p className="text-sm text-destructive">{errors.website.message}</p>
                      )}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Social Links</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="linkedin" className="flex items-center space-x-2">
                          <Linkedin className="h-4 w-4" />
                          <span>LinkedIn</span>
                        </Label>
                        <Input
                          id="linkedin"
                          {...register('linkedin')}
                          className="bg-widget-bg border-glass-border"
                          placeholder="linkedin.com/in/username"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="twitter" className="flex items-center space-x-2">
                          <Twitter className="h-4 w-4" />
                          <span>Twitter</span>
                        </Label>
                        <Input
                          id="twitter"
                          {...register('twitter')}
                          className="bg-widget-bg border-glass-border"
                          placeholder="@username"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="github" className="flex items-center space-x-2">
                          <Github className="h-4 w-4" />
                          <span>GitHub</span>
                        </Label>
                        <Input
                          id="github"
                          {...register('github')}
                          className="bg-widget-bg border-glass-border"
                          placeholder="github.com/username"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={!isDirty}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Skills & Endorsements */}
        <div className={isEditing ? 'lg:col-span-1' : 'lg:col-span-2'}>
          <Card className="widget-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Skills & Endorsements</CardTitle>
                  <CardDescription>
                    Showcase your expertise and get endorsed by your network.
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Skill
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Enter a skill..."
                    className="bg-widget-bg border-glass-border"
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                  />
                  <Button onClick={addSkill} size="sm">
                    Add
                  </Button>
                </div>

                <div className="space-y-4">
                  {skills.map((skill) => (
                    <div key={skill.id} className="p-4 bg-accent/20 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <span className="font-medium">{skill.name}</span>
                          <Badge variant="secondary" className="text-xs">
                            {skill.endorsementCount} endorsements
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => endorseSkill(skill.id)}
                          >
                            <Star className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeSkill(skill.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Proficiency</span>
                          <span>{skill.level}%</span>
                        </div>
                        <Progress value={skill.level} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <div className={isEditing ? 'lg:col-span-3' : 'lg:col-span-1'}>
          <Card className="widget-card">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{user?.email}</p>
                    <p className="text-sm text-muted-foreground">Email</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">+1 (555) 123-4567</p>
                    <p className="text-sm text-muted-foreground">Phone</p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <h4 className="font-medium">Social Links</h4>
                  <div className="flex items-center space-x-3">
                    <Linkedin className="h-5 w-5 text-muted-foreground" />
                    <a href="#" className="text-primary hover:underline">
                      linkedin.com/in/alexjohnson
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Twitter className="h-5 w-5 text-muted-foreground" />
                    <a href="#" className="text-primary hover:underline">
                      @alexj_design
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Github className="h-5 w-5 text-muted-foreground" />
                    <a href="#" className="text-primary hover:underline">
                      github.com/alexjohnson
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
