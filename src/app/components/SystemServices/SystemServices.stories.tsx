import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';

import {SystemServices} from './SystemServices';

const meta: Meta<typeof SystemServices> = {
  component: SystemServices,
};

export default meta;

type Story = StoryObj<typeof SystemServices>;

export const Basic: Story = {args: {}};
