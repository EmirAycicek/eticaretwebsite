"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const { toast } = useToast();

  return (
    <div>
      <button>deneme</button>
      <Button>deneme</Button>

      <Button
        onClick={() => {
          toast({
            variant: "destructive",
            title: "Selamlar dostum",
            description: "Bugün günlerden cumartesi saat 17:26",
          });
        }}
      >
        Show Toast
      </Button>
    </div>
  );
}
