import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  Group,
  Text,
} from "@mantine/core";
import CreatePPV from "./createPpvForm";
import prisma from "@/lib/db";

export default async function Home() {
  const companies = await prisma.companies.findMany();
  const wrestlers = await prisma.wrestlers.findMany();

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShellHeader>
        <Group className="h-full px-md">
          <Text>WrestleBase - Admin</Text>
        </Group>
      </AppShellHeader>
      <AppShellMain>
        <CreatePPV companies={companies} wrestlers={wrestlers} />
      </AppShellMain>
    </AppShell>
  );
}
