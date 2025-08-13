import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "high" | "medium" | "low" | "critical" | "open" | "closed" | "in-progress" | "resolved";
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const statusConfig = {
    critical: { label: "Critical", variant: "destructive" as const },
    high: { label: "High", variant: "destructive" as const },
    medium: { label: "Medium", variant: "secondary" as const },
    low: { label: "Low", variant: "secondary" as const },
    open: { label: "Open", variant: "destructive" as const },
    "in-progress": { label: "In Progress", variant: "secondary" as const },
    resolved: { label: "Resolved", variant: "secondary" as const },
    closed: { label: "Closed", variant: "secondary" as const },
  };

  const config = statusConfig[status];
  
  return (
    <Badge 
      variant={config.variant}
      className={cn(
        status === "critical" && "bg-destructive text-destructive-foreground",
        status === "high" && "bg-warning text-warning-foreground",
        status === "medium" && "bg-info text-info-foreground",
        status === "low" && "bg-success text-success-foreground",
        status === "resolved" && "bg-success text-success-foreground",
        status === "closed" && "bg-success text-success-foreground",
        className
      )}
    >
      {config.label}
    </Badge>
  );
}