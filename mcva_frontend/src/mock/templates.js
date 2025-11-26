export const templates = [
  {
    id: 'basic',
    name: 'Basic Template',
    sections: [
      {
        id: 'details',
        label: 'Details',
        description: 'General information about the template',
        fields: [
          { name: 'title', label: 'Title', type: 'text', default: 'Customer Intake' },
          { name: 'description', label: 'Description', type: 'text', default: 'Collects essential info' },
        ],
      },
      {
        id: 'fields',
        label: 'Fields',
        description: 'Field configuration',
        fields: [
          { name: 'type', label: 'Form Type', type: 'select', default: 'contact', options: [
            { value: 'contact', label: 'Contact' },
            { value: 'feedback', label: 'Feedback' },
            { value: 'registration', label: 'Registration' },
          ]},
          { name: 'active', label: 'Active', type: 'checkbox', default: true },
        ],
      },
      {
        id: 'styling',
        label: 'Styling',
        description: 'Visual styling options',
        fields: [
          { name: 'accentColor', label: 'Accent Color', type: 'color', default: '#2563EB' },
        ],
      },
      {
        id: 'validation',
        label: 'Validation',
        description: 'Rules for validating inputs',
        fields: [
          { name: 'requireEmail', label: 'Require Email', type: 'checkbox', default: true },
        ],
      },
      {
        id: 'metadata',
        label: 'Metadata',
        description: 'Additional descriptive fields',
        fields: [
          { name: 'owner', label: 'Owner', type: 'text', default: 'Admin' },
        ],
      },
    ],
  },
  {
    id: 'survey',
    name: 'Survey Template',
    sections: [
      {
        id: 'details',
        label: 'Details',
        description: 'General survey details',
        fields: [
          { name: 'title', label: 'Title', type: 'text', default: 'Satisfaction Survey' },
          { name: 'description', label: 'Description', type: 'text', default: 'Help us improve' },
        ],
      },
      {
        id: 'fields',
        label: 'Fields',
        description: 'Survey fields configuration',
        fields: [
          { name: 'type', label: 'Survey Type', type: 'select', default: 'nps', options: [
            { value: 'nps', label: 'NPS' },
            { value: 'csat', label: 'CSAT' },
            { value: 'custom', label: 'Custom' },
          ]},
          { name: 'active', label: 'Active', type: 'checkbox', default: false },
        ],
      },
      {
        id: 'styling',
        label: 'Styling',
        description: 'Visual styling',
        fields: [
          { name: 'accentColor', label: 'Accent Color', type: 'color', default: '#F59E0B' },
        ],
      },
      {
        id: 'validation',
        label: 'Validation',
        description: 'Validation rules',
        fields: [
          { name: 'requireEmail', label: 'Require Email', type: 'checkbox', default: false },
        ],
      },
      {
        id: 'metadata',
        label: 'Metadata',
        description: 'Extra metadata',
        fields: [
          { name: 'owner', label: 'Owner', type: 'text', default: 'Research' },
        ],
      },
    ],
  },
];
