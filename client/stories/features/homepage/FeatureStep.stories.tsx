import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { ChooseVoucherIcon, FeatureStep } from "features/homepage";

export default {
  title: "Features/Homepage/FeatureStep",
  component: FeatureStep,
} as ComponentMeta<typeof FeatureStep>;

const Template: ComponentStory<typeof FeatureStep> = (args) => (
  <FeatureStep {...args} />
);

export const Default = Template.bind({});
Default.args = {
  Icon: ChooseVoucherIcon,
  title: "1. Start",
  descriptions: [
    "Pilih salah satu voucher dari",
    "game yang ingin kamu top up",
  ],
};
