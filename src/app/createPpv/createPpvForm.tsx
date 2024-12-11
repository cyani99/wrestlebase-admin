"use client";

import { useForm } from "@mantine/form";
import { TextInput, Button, Group, Checkbox, Select } from "@mantine/core";

interface IProps {
  companies: { id: number; name: string }[];
}

export default function CreatePPV({ companies }: IProps) {
  const companiesList = companies.map((company) => {
    return { value: company.id.toString(), label: company.name };
  });

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      ppv_Type: "",
      ppv_Name: "",
      ppv: false,
      location: "",
    },
  });

  return (
    <div className="flex flex-col gap-2">
      <form
        onSubmit={form.onSubmit(async (values) => {
          console.log(values);
          try {
            const response = await fetch("/api/ppv/", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ values }),
            });
            const data = await response.json();
            console.log("Post stworzony:", data);
          } catch (error) {
            console.error("Błąd:", error);
          }
        })}
      >
        <Select
          data={companiesList}
          label="Company"
          placeholder="WWE"
          searchable
        />
        <TextInput
          label="PPV Type"
          placeholder="RAW"
          key={form.key("ppv_Type")}
          {...form.getInputProps("ppv_Type")}
        />
        <TextInput
          label="PPV Name"
          placeholder="Survivor Series 2021"
          key={form.key("ppv_Name")}
          {...form.getInputProps("ppv_Name")}
        />
        <Checkbox
          label="Is PPV?"
          key={form.key("ppv")}
          {...form.getInputProps("ppv", { type: "checkbox" })}
        />
        <TextInput
          label="Location"
          placeholder="Londong, England"
          key={form.key("location")}
          {...form.getInputProps("location")}
        />
        <Group justify="center" mt="xl">
          <Button type="submit">Create</Button>
        </Group>
      </form>
    </div>
  );
}
