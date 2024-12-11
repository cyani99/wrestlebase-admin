"use client";
import { Checkbox, NumberInput, Select, TextInput } from "@mantine/core";
import { useState } from "react";

interface IProps {
  wrestlers: { id: number; name: string; wrestlerCompanyId: string }[];
  setMatches: () => void;
}
export default function CreateMatch({ wrestlers }: IProps) {
  const [howManyWrestlers, setHowManyWrestler] = useState(2);
  const [titleDefense, setTitleDefense] = useState(false);
  const [mainEvent, setMainEvent] = useState(false);
  const [title, setTitle] = useState("");
  const [selectedWrestlers, setSelectedWrestlers] = useState(
    Array(howManyWrestlers).fill(null), // Inicjujemy stan jako tablica `null`
  );

  const wrestlersList = wrestlers.map((wrestler) => {
    return { value: wrestler.id.toString(), label: wrestler.name };
  });

  const handleSelectChange = (value, index) => {
    // Aktualizujemy stan dla konkretnego indexu
    const updatedWrestlers = [...selectedWrestlers];
    updatedWrestlers[index] = value;
    setSelectedWrestlers(updatedWrestlers);
  };

  return (
    <div className="flex flex-col gap-2 pl-4">
      <NumberInput
        label="How Many Wrestlers?"
        placeholder="2"
        value={howManyWrestlers}
        onChange={(e) => {
          let value = Number(e);
          if (value > 10) {
            value = 10;
          }
          if (value < 1) {
            value = 1;
          }
          setHowManyWrestler(value);
        }}
      ></NumberInput>
      <Checkbox
        label="Title Defense?"
        checked={titleDefense}
        onChange={(e) => {
          setTitleDefense(e.currentTarget.checked);
        }}
      />
      <Checkbox
        label="Is Main Event?"
        checked={mainEvent}
        onChange={(e) => {
          setMainEvent(e.currentTarget.checked);
        }}
      />
      <TextInput
        label="Match Title"
        placeholder="WWE Championship"
        value={title}
        onChange={(e) => {
          setTitle(e.currentTarget.value);
        }}
      />
      {Array.from({ length: howManyWrestlers }, (_, index) => (
        <div key={index}>
          <Select
            label="Select first Wrestler"
            placeholder="John Cena"
            data={wrestlersList}
            searchable
            value={selectedWrestlers[index] || ""}
            onChange={(value) => handleSelectChange(value, index)}
          />
        </div>
      ))}
    </div>
  );
}
