
import { useState } from 'react';
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Mail, Lock, Server } from 'lucide-react';

type EmailConfigFormProps = {
  onSubmit: (config: EmailConfig) => void;
};

export type EmailConfig = {
  emailAddress: string;
  connectionType: string;
  username: string;
  password: string;
  host?: string;
  port?: string;
};

const EmailConfigForm = ({ onSubmit }: EmailConfigFormProps) => {
  const [config, setConfig] = useState<EmailConfig>({
    emailAddress: '',
    connectionType: '',
    username: '',
    password: '',
    host: '',
    port: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!config.emailAddress || !config.connectionType || !config.username || !config.password) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!isValidEmail(config.emailAddress)) {
      toast.error("Please enter a valid email address");
      return;
    }

    onSubmit(config);
    toast.success("Email configuration saved successfully");
    
    setConfig({
      emailAddress: '',
      connectionType: '',
      username: '',
      password: '',
      host: '',
      port: '',
    });
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleConnectionTypeChange = (value: string) => {
    let host = '';
    let port = '';

    switch (value) {
      case 'GMAIL':
        host = 'imap.gmail.com';
        port = '993';
        break;
      case 'OUTLOOK':
        host = 'outlook.office365.com';
        port = '993';
        break;
      case 'YAHOO':
        host = 'imap.mail.yahoo.com';
        port = '993';
        break;
    }

    setConfig(prev => ({
      ...prev,
      connectionType: value,
      host,
      port
    }));
  };

  return (
    <Card className="p-6 space-y-6 animate-fade-up glass-card">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="emailAddress" className="text-sm font-medium">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            <Input
              id="emailAddress"
              type="email"
              placeholder="Enter your email address"
              value={config.emailAddress}
              onChange={(e) => setConfig({ ...config, emailAddress: e.target.value })}
              className="pl-10 input-gradient"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="connectionType">Connection Type</Label>
          <Select
            value={config.connectionType}
            onValueChange={handleConnectionTypeChange}
          >
            <SelectTrigger className="w-full input-gradient">
              <SelectValue placeholder="Select connection type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="GMAIL">Gmail (IMAP)</SelectItem>
              <SelectItem value="OUTLOOK">Outlook</SelectItem>
              <SelectItem value="YAHOO">Yahoo Mail</SelectItem>
              <SelectItem value="IMAP">Custom IMAP</SelectItem>
              <SelectItem value="POP3">Custom POP3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            <Input
              id="username"
              type="text"
              placeholder="Enter username"
              value={config.username}
              onChange={(e) => setConfig({ ...config, username: e.target.value })}
              className="pl-10 input-gradient"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password / App Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            <Input
              id="password"
              type="password"
              placeholder="Enter password or app password"
              value={config.password}
              onChange={(e) => setConfig({ ...config, password: e.target.value })}
              className="pl-10 input-gradient"
            />
          </div>
        </div>

        {config.connectionType === 'IMAP' || config.connectionType === 'POP3' ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="host">Host</Label>
              <div className="relative">
                <Server className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="host"
                  type="text"
                  placeholder="Enter host (e.g., imap.gmail.com)"
                  value={config.host}
                  onChange={(e) => setConfig({ ...config, host: e.target.value })}
                  className="pl-10 input-gradient"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="port">Port</Label>
              <div className="relative">
                <Server className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="port"
                  type="text"
                  placeholder="Enter port (e.g., 993)"
                  value={config.port}
                  onChange={(e) => setConfig({ ...config, port: e.target.value })}
                  className="pl-10 input-gradient"
                />
              </div>
            </div>
          </>
        ) : null}

        <div className="pt-4">
          <Button type="submit" className="w-full button-gradient">
            Save Configuration
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default EmailConfigForm;
