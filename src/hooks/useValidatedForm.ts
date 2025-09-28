import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import type { z } from "zod";

export function useValidatedForm<T extends z.ZodType>(
  schema: T,
  defaultValues: z.infer<T>,
  onSubmit: (data: z.infer<T>) => void | Promise<void>
) {
  const { toast } = useToast();
  
  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const handleSubmit = async (data: z.infer<T>) => {
    try {
      await onSubmit(data);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive"
      });
    }
  };

  return {
    form,
    handleSubmit: form.handleSubmit(handleSubmit),
    isValid: form.formState.isValid,
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting,
  };
}