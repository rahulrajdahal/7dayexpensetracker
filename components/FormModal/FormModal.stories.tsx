import type { Meta, StoryObj } from '@storybook/react';

import FormModal from './FormModal';

const meta = {
  title: 'Components/FormModal',
  component: FormModal,
  tags: ['autodocs'],
} satisfies Meta<typeof FormModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <p>The modal content</p>,
    trigger: <button>Click me</button>,
    isOpen: false,
    setIsOpen: () => {},
  },
};
