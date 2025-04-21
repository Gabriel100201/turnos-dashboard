import { Card } from "@/components/ui/card";

interface CardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const CardComponent = ({ children, style }: CardProps) => {
  return <Card style={{ ...style, padding: "2rem" }}>{children}</Card>;
};
