"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your full name."),
  email: z.string().email("Please enter a valid email."),
  phone: z.string().min(7, "Please enter a valid phone number."),
  projectType: z.string().min(1, "Please select a project type."),
  message: z.string().min(10, "Tell us a little more about your project."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const fieldClassName =
  "h-12 rounded-none border-0 border-b border-hairline bg-transparent px-0 text-base text-foreground placeholder:text-graphite/70 focus-visible:border-brand-blue focus-visible:ring-0";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (values: ContactFormValues) => {
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-hairline bg-bg-secondary p-12 text-center">
        <CheckCircle2 className="size-10 text-brand-blue" />
        <h3 className="font-heading text-xl font-medium">Request received.</h3>
        <p className="max-w-sm text-sm text-graphite">
          Thank you — our engineering team will reach out within one business day.
        </p>
        <Button variant="outline" onClick={() => setStatus("idle")}>
          Send another request
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8" noValidate>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name" className="text-xs uppercase tracking-[0.15em] text-graphite">
            Full Name
          </Label>
          <Input id="name" className={fieldClassName} {...register("name")} />
          {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="email" className="text-xs uppercase tracking-[0.15em] text-graphite">
            Email
          </Label>
          <Input id="email" type="email" className={fieldClassName} {...register("email")} />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="phone" className="text-xs uppercase tracking-[0.15em] text-graphite">
            Phone
          </Label>
          <Input id="phone" type="tel" className={fieldClassName} {...register("phone")} />
          {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <Label
            htmlFor="projectType"
            className="text-xs uppercase tracking-[0.15em] text-graphite"
          >
            Project Type
          </Label>
          <Input
            id="projectType"
            placeholder="Residential, Commercial, Healthcare..."
            className={fieldClassName}
            {...register("projectType")}
          />
          {errors.projectType && (
            <p className="text-xs text-destructive">{errors.projectType.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="message" className="text-xs uppercase tracking-[0.15em] text-graphite">
          Project Details
        </Label>
        <Textarea
          id="message"
          rows={4}
          className="rounded-none border-0 border-b border-hairline bg-transparent px-0 text-base text-foreground placeholder:text-graphite/70 focus-visible:border-brand-blue focus-visible:ring-0"
          {...register("message")}
        />
        {errors.message && <p className="text-xs text-destructive">{errors.message.message}</p>}
      </div>

      {status === "error" && (
        <p className="text-sm text-destructive">
          Something went wrong. Please try again or call us directly.
        </p>
      )}

      <Button size="xl" type="submit" disabled={status === "submitting"}>
        {status === "submitting" && <Loader2 className="size-4 animate-spin" />}
        Request Consultation
      </Button>
    </form>
  );
}
