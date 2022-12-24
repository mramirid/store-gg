import type { ComponentMeta, ComponentStory } from "@storybook/react";
import TextInput from "components/TextInput";

export default {
  title: "Components/TextInput",
  component: TextInput,
} as ComponentMeta<typeof TextInput>;

const Template: ComponentStory<typeof TextInput> = (args) => (
  <TextInput {...args} />
);

export const Default = Template.bind({});
Default.args = {
  label: "Full Name",
  type: "text",
};
