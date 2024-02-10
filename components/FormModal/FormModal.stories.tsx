import type { Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';
import FormModal from './FormModal';

const meta = {
  title: 'Components/FormModal',
  component: FormModal,
  tags: ['autodocs'],
} satisfies Meta<typeof FormModal>;

export default meta;

type Story = StoryObj<typeof meta>;

const StoryComponent = ({ ...args }) => {
  const [isOpen, setIsOpen] = useState(args.isOpen);

  return (
    <FormModal isOpen={isOpen} setIsOpen={setIsOpen} trigger={args.trigger}>
      {args.children}
    </FormModal>
  );
};

let isOpen = false;
export const Default: Story = {
  render: (args) => <StoryComponent {...args} />,
  args: {
    children: <p>The modal content</p>,
    trigger: <button>Click me</button>,
    isOpen,
    setIsOpen: () => {
      isOpen = !isOpen;
    },
  },
};
