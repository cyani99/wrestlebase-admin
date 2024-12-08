import { ColorSchemesSwitcher } from "@/components/color-schemes-switcher";
import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  Group,
  Text,
  Title,
} from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShellHeader>
        <Group className="h-full px-md">
          <Text>WrestleBase - Admin</Text>
        </Group>
      </AppShellHeader>
      <AppShellMain>
        <div className="flex flex-col gap-2">
          <Link href="/createPpv">CREATE PPV</Link>
          <Link href="/createCompany">CREATE Company</Link>
          <Link href="/createWrestler">CREATE Wrestler</Link>
        </div>
      </AppShellMain>
    </AppShell>
  );
}
