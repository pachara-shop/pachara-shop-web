import { Icon } from '@/components/atoms/Icon';
import { SOCIAL_PLATFORMS } from '@/shared/constants/social-platforms';
interface SocialIconProps {
  type: string;
  className?: string;
}

export const SocialIcon = ({
  type,
  className = 'h-5 w-5',
}: SocialIconProps) => {
  const iconName = SOCIAL_PLATFORMS.find((t) => t.type === type)?.iconName;
  return <Icon icon={`icon-[${iconName}]`} className={className} />;
};
