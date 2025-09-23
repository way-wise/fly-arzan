import { useState } from "react";
import { MoreVertical, Mail, Send, User } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../../components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Link, useNavigate } from "react-router-dom";

// Mock data for users
const users = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com" },
  { id: 4, name: "Sarah Wilson", email: "sarah@example.com" },
];

export default function Users() {
  const [emailOpen, setEmailOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const navigate = useNavigate();

  const handleMailClick = (user) => {
    setSelectedUser(user);
    setEmailOpen(true);
  };

  const handleSendEmail = () => {
    if (selectedUser) {
      const mailtoLink = `mailto:${
        selectedUser.email
      }?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(
        emailMessage
      )}`;
      window.location.href = mailtoLink;
      setEmailOpen(false);
      // Reset form
      setEmailSubject("");
      setEmailMessage("");
      setSelectedUser(null);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Users Management</CardTitle>
          <CardDescription>
            Manage your users and their accounts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="tw:text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="tw:font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="tw:text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="tw:h-8 tw:w-8 tw:p-0"
                        >
                          <MoreVertical className="tw:h-4 tw:w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => navigate(`/admin/users/${user.id}`)}
                        >
                          <User className="tw:h-4 tw:w-4 tw:mr-2" />
                          Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleMailClick(user)}>
                          <Mail className="tw:h-4 tw:w-4 tw:mr-2" />
                          Mail
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="tw:text-red-600 tw:focus:text-red-600 tw:focus:bg-red-50">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={emailOpen} onOpenChange={setEmailOpen}>
        <DialogContent className="sm:tw:max-w-md">
          <DialogHeader>
            <DialogTitle>Send Email to {selectedUser?.name}</DialogTitle>
            <DialogDescription>
              Compose an email message to be sent to {selectedUser?.email}
            </DialogDescription>
          </DialogHeader>
          <div className="tw:space-y-4">
            <div className="tw:space-y-2">
              <Label htmlFor="email-to">To</Label>
              <Input
                id="email-to"
                value={selectedUser?.email || ""}
                disabled
                className="tw:bg-gray-100"
              />
            </div>
            <div className="tw:space-y-2">
              <Label htmlFor="email-subject">Subject</Label>
              <Input
                id="email-subject"
                placeholder="Enter email subject..."
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
              />
            </div>
            <div className="tw:space-y-2">
              <Label htmlFor="email-message">Message</Label>
              <Textarea
                id="email-message"
                placeholder="Type your message here..."
                className="tw:min-h-32"
                value={emailMessage}
                onChange={(e) => setEmailMessage(e.target.value)}
              />
            </div>
            <div className="tw:flex tw:justify-end tw:gap-2">
              <Button variant="outline" onClick={() => setEmailOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleSendEmail}
                disabled={!emailSubject.trim() || !emailMessage.trim()}
              >
                <Send className="tw:h-4 tw:w-4 tw:mr-2" />
                Send Email
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
