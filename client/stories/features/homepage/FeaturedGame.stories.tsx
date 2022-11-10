import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { FeaturedGame } from "../../../features/homepage";

export default {
  title: "Features/Homepage/FeaturedGame",
  component: FeaturedGame,
} as ComponentMeta<typeof FeaturedGame>;

const Template: ComponentStory<typeof FeaturedGame> = (args) => (
  <FeaturedGame {...args} />
);

export const Default = Template.bind({});
Default.args = {
  id: "123",
  imageUrl: "/images/featured-game.png",
  name: "Super Mechs",
  category: "Mobile",
};
