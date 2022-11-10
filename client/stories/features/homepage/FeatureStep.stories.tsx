import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { ChooseGameIcon, FeatureStep } from "../../../features/homepage";

export default {
  title: "Features/Homepage/FeatureStep",
  component: FeatureStep,
} as ComponentMeta<typeof FeatureStep>;

const Template: ComponentStory<typeof FeatureStep> = (args) => (
  <FeatureStep {...args} />
);

export const Default = Template.bind({});
Default.args = {
  Icon: ChooseGameIcon,
  title: "1. Start",
  descriptions: ["Pilih salah satu game", "yang ingin kamu top up"],
};
