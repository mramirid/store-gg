import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { FeaturedVoucher } from "features/homepage";

export default {
  title: "Features/Homepage/FeaturedVoucher",
  component: FeaturedVoucher,
} as ComponentMeta<typeof FeaturedVoucher>;

const Template: ComponentStory<typeof FeaturedVoucher> = (args) => (
  <FeaturedVoucher {...args} />
);

export const Default = Template.bind({});
Default.args = {
  id: "123",
  imageUrl: "/images/featured-voucher.png",
  name: "Super Mechs",
  category: "Mobile",
};
