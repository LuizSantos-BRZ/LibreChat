import { Feather } from 'lucide-react';
import { EModelEndpoint, alternateName } from 'librechat-data-provider';
import { IconProps } from '~/common';
import { cn } from '~/utils';

const MinimalIcon: React.FC<IconProps> = (props) => {
  const { size = 30, iconURL = '', error } = props;

  let endpoint = 'default'; // Default value for endpoint

  if (typeof props.endpoint === 'string') {
    endpoint = props.endpoint;
  }

  // Use agent icon (Feather) for all endpoints
  const agentIcon = <Feather className="icon-sm" />;

  const endpointIcons = {
    [EModelEndpoint.azureOpenAI]: {
      icon: agentIcon,
      name: props.chatGptLabel ?? 'ChatGPT',
    },
    [EModelEndpoint.openAI]: {
      icon: agentIcon,
      name: props.chatGptLabel ?? 'ChatGPT',
    },
    [EModelEndpoint.gptPlugins]: { icon: agentIcon, name: 'Plugins' },
    [EModelEndpoint.google]: { icon: agentIcon, name: props.modelLabel ?? 'Google' },
    [EModelEndpoint.anthropic]: {
      icon: agentIcon,
      name: props.modelLabel ?? 'Claude',
    },
    [EModelEndpoint.custom]: {
      icon: agentIcon,
      name: 'Custom',
    },
    [EModelEndpoint.chatGPTBrowser]: { icon: agentIcon, name: 'ChatGPT' },
    [EModelEndpoint.assistants]: { icon: agentIcon, name: 'Assistant' },
    [EModelEndpoint.azureAssistants]: { icon: agentIcon, name: 'Assistant' },
    [EModelEndpoint.agents]: {
      icon: agentIcon,
      name: props.modelLabel ?? alternateName[EModelEndpoint.agents],
    },
    [EModelEndpoint.bedrock]: {
      icon: agentIcon,
      name: props.modelLabel ?? alternateName[EModelEndpoint.bedrock],
    },
    default: {
      icon: agentIcon,
      name: endpoint,
    },
  };

  let { icon, name } = endpointIcons[endpoint] ?? endpointIcons.default;
  if (iconURL && endpointIcons[iconURL] != null) {
    ({ icon, name } = endpointIcons[iconURL]);
  }

  return (
    <div
      data-testid="convo-icon"
      title={name}
      aria-hidden="true"
      style={{
        width: size,
        height: size,
      }}
      className={cn(
        'relative flex items-center justify-center rounded-sm text-text-secondary',
        props.className ?? '',
      )}
    >
      {icon}
      {error === true && (
        <span className="absolute right-0 top-[20px] -mr-2 flex h-4 w-4 items-center justify-center rounded-full border border-white bg-red-500 text-[10px] text-text-secondary">
          !
        </span>
      )}
    </div>
  );
};

export default MinimalIcon;
