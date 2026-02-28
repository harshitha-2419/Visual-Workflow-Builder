import type { NodeTemplate } from '../../types/workflow.types';

export const nodeTemplates: NodeTemplate[] = [
  {
    type: 'trigger',
    label: 'Manual Trigger',
    description: 'Start workflow manually',
    icon: 'Play',
    defaultConfig: {
      triggerType: 'manual'
    }
  },
  {
    type: 'trigger',
    label: 'Schedule Trigger',
    description: 'Start workflow on schedule',
    icon: 'Clock',
    defaultConfig: {
      triggerType: 'schedule',
      schedule: '0 9 * * *'
    }
  },
  {
    type: 'trigger',
    label: 'Webhook Trigger',
    description: 'Start workflow via webhook',
    icon: 'Webhook',
    defaultConfig: {
      triggerType: 'webhook',
      url: ''
    }
  },
  {
    type: 'action',
    label: 'HTTP Request',
    description: 'Make an HTTP request',
    icon: 'Globe',
    defaultConfig: {
      actionType: 'http',
      method: 'GET',
      url: ''
    }
  },
  {
    type: 'action',
    label: 'Send Email',
    description: 'Send an email',
    icon: 'Mail',
    defaultConfig: {
      actionType: 'email',
      to: '',
      subject: '',
      body: ''
    }
  },
  {
    type: 'action',
    label: 'Transform Data',
    description: 'Transform data',
    icon: 'Shuffle',
    defaultConfig: {
      actionType: 'transform',
      transformation: ''
    }
  },
  {
    type: 'action',
    label: 'Delay',
    description: 'Wait for a period',
    icon: 'Timer',
    defaultConfig: {
      actionType: 'delay',
      duration: 1000
    }
  },
  {
    type: 'condition',
    label: 'If/Else',
    description: 'Conditional branching',
    icon: 'GitBranch',
    defaultConfig: {
      condition: '',
      operator: '=='
    }
  },
  {
    type: 'condition',
    label: 'Switch',
    description: 'Multiple conditions',
    icon: 'Split',
    defaultConfig: {
      condition: '',
      cases: []
    }
  },
  {
    type: 'condition',
    label: 'Filter',
    description: 'Filter data',
    icon: 'Filter',
    defaultConfig: {
      condition: '',
      filterType: 'include'
    }
  }
];
