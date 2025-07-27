import { useState } from "react";
import { Check, Building2, Plus, Crown, Star, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

interface Tenant {
  id: string;
  name: string;
  plan: 'standard' | 'premium' | 'enterprise';
  role: string;
  logo?: string;
  memberCount: number;
  isActive: boolean;
}

interface TenantSwitcherProps {
  currentTenant: Tenant;
  tenants: Tenant[];
  onTenantChange: (tenant: Tenant) => void;
}

const planIcons = {
  standard: Circle,
  premium: Star,
  enterprise: Crown,
};

const planColors = {
  standard: "bg-blue-500",
  premium: "bg-purple-500", 
  enterprise: "bg-orange-500",
};

export function TenantSwitcher({ currentTenant, tenants, onTenantChange }: TenantSwitcherProps) {
  const [open, setOpen] = useState(false);

  const mockTenants: Tenant[] = [
    {
      id: "acme",
      name: "Acme Corporation",
      plan: "enterprise",
      role: "Administrator",
      memberCount: 45,
      isActive: true,
    },
    {
      id: "tech",
      name: "Tech Innovations",
      plan: "premium",
      role: "Manager",
      memberCount: 12,
      isActive: true,
    },
    {
      id: "retail",
      name: "Retail Plus",
      plan: "standard",
      role: "User",
      memberCount: 8,
      isActive: true,
    },
  ];

  const allTenants = tenants.length > 0 ? tenants : mockTenants;
  const current = currentTenant || allTenants[0];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between bg-gradient-to-r from-background/80 to-muted/40 backdrop-blur-xl border-border/50 hover:shadow-glow hover:border-primary/30 transition-all duration-300"
        >
          <div className="flex items-center space-x-3">
            <Avatar className="h-6 w-6">
              <AvatarImage src={current.logo} alt={current.name} />
              <AvatarFallback className={`text-xs ${planColors[current.plan]} text-white`}>
                {current.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start">
              <span className="text-sm font-medium truncate max-w-32">
                {current.name}
              </span>
              <span className="text-xs text-muted-foreground">
                {current.role}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Badge variant="secondary" className="text-xs">
              {current.plan}
            </Badge>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 w-80">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle>Switch Organization</DialogTitle>
          <DialogDescription>
            Select the organization you want to work with.
          </DialogDescription>
        </DialogHeader>
        <Command>
          <CommandInput placeholder="Search organizations..." />
          <CommandList>
            <CommandEmpty>No organizations found.</CommandEmpty>
            <CommandGroup heading="Your Organizations">
              {allTenants.map((tenant) => {
                const PlanIcon = planIcons[tenant.plan];
                return (
                  <CommandItem
                    key={tenant.id}
                    onSelect={() => {
                      onTenantChange(tenant);
                      setOpen(false);
                    }}
                    className="flex items-center justify-between p-3"
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={tenant.logo} alt={tenant.name} />
                        <AvatarFallback className={`text-xs ${planColors[tenant.plan]} text-white`}>
                          {tenant.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{tenant.name}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-muted-foreground">
                            {tenant.role}
                          </span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">
                            {tenant.memberCount} members
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <PlanIcon className="h-3 w-3 text-muted-foreground" />
                        <Badge variant="outline" className="text-xs capitalize">
                          {tenant.plan}
                        </Badge>
                      </div>
                      {current.id === tenant.id && (
                        <Check className="h-4 w-4 text-primary" />
                      )}
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <CommandItem className="flex items-center space-x-3 p-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-md border border-dashed">
                  <Plus className="h-4 w-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Create Organization</span>
                  <span className="text-xs text-muted-foreground">
                    Set up a new workspace
                  </span>
                </div>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}