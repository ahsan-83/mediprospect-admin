import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function WebsiteSelection() {
  const [selection, setSelection] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
      }
    };
    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const handleContinue = () => {
    if (!selection) {
      toast({
        title: "Please select an option",
        description: "Choose either Create Website or Update Website",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: `Proceeding to ${selection} mode`,
    });
    navigate("/doctor-information");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-accent/20 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold">Website Management</CardTitle>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
          <CardDescription>
            Select an option to manage your doctor website
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="website-action">Choose Action</Label>
            <Select value={selection} onValueChange={setSelection}>
              <SelectTrigger id="website-action">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="Create Website">Create Website</SelectItem>
                <SelectItem value="Update Website">Update Website</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            className="w-full"
            onClick={handleContinue}
            disabled={loading}
          >
            Continue
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
