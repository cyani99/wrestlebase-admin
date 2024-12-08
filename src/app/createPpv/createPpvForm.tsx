"use client";

import { useForm } from "@mantine/form";
import {
  TextInput,
  Button,
  Group,
  Checkbox,
  NumberInput,
  Select,
} from "@mantine/core";
import { useState } from "react";
import CreateMatch from "./createMatchForm";

interface IProps {
  companies: { id: number; name: string }[];
  wrestlers: { id: number; name: string; wrestlerCompanyId: string }[];
}

export default function CreatePPV({ companies, wrestlers }: IProps) {
  const [howManyMatches, setHowManyMatches] = useState(5);
  const [matches, setMatches] = useState(
    Array(howManyMatches).fill(null), // Inicjujemy stan jako tablica `null`
  );
  const companiesList = companies.map((company) => {
    return { value: company.id.toString(), label: company.name };
  });

  const handleSetMatches = (value, index) => {
    // Aktualizujemy stan dla konkretnego indexu
    const updatedMatches = [...matches];
    updatedMatches[index] = value;
    setMatches(updatedMatches);
  };

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
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Select
          data={companiesList}
          label="Company"
          placeholder="WWE"
          searchable
        />
        <NumberInput
          label="How Many Matches?"
          placeholder="5"
          value={howManyMatches}
          onChange={(e) => {
            let value = Number(e);
            if (value > 20) {
              value = 20;
            }
            if (value < 1) {
              value = 1;
            }
            setHowManyMatches(value);
          }}
        ></NumberInput>
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
        Match Card:
        {Array.from({ length: howManyMatches }, (_, index) => (
          <div key={index}>
            <h2>Match {index + 1}</h2>
            <CreateMatch wrestlers={wrestlers} setMatch={handleSetMatches} />
          </div>
        ))}
        <Group justify="center" mt="xl">
          <Button type="submit">Create</Button>
        </Group>
      </form>
    </div>
  );
}
