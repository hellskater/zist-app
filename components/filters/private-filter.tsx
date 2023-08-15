import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

type Props = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

function PrivateFilter({ checked, onChange }: Props) {
  return (
    <div className="flex items-center space-x-3">
      <Switch
        checked={checked}
        onCheckedChange={onChange}
        id="private-filter"
      />
      <Label htmlFor="private-filter" className="text-lg cursor-pointer">
        Private
      </Label>
    </div>
  );
}

export default PrivateFilter;
