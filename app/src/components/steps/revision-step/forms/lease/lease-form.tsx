import { TabContainer, TabPanel } from "@/components/ui/tab-navigation";
import { PartiesSection } from "./sections/parties-section";
import { DescriptionSection } from "./sections/description-section";

export function LeaseForm() {
  return (
    <TabContainer initialTabName="Parties" className="flex-1">
      <TabPanel tabName="Parties">
        <PartiesSection />
      </TabPanel>
      <TabPanel tabName="Description des locaux loués">
        <DescriptionSection />
      </TabPanel>
      <TabPanel tabName="Durée" />
      <TabPanel tabName="Loyer" />
      <TabPanel tabName="Mesures d'accompagnement" />
      <TabPanel tabName="Garanties" />
      <TabPanel tabName="Honoraires, impots, taxes et assurance du bailleur" />
      <TabPanel tabName="Travaux - réparations - remplacements" />
      <TabPanel tabName="Autorisations de travaux" />
      <TabPanel tabName="Restitution des locaux loués" />
      <TabPanel tabName="Sous-location / Location-gerance / Domiciliation / Cession" />
      <TabPanel tabName="Droit de préemption / Droit de préférence" />
      <TabPanel tabName="Environnement" />
      <TabPanel tabName="Stipulations intuitu personae / Renonciations" />
      <TabPanel tabName="Relations avec le preneur" />
      <TabPanel tabName="Commentaires" />
      <TabPanel tabName="Documents revus" />
    </TabContainer>
  );
}
