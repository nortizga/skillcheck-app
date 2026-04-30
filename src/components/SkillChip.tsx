interface Props {
  label: string;
  active: boolean;
  onClick: () => void;
}

export default function SkillChip({ label, active, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-full text-[13px] font-semibold font-body transition-all duration-200 cursor-pointer"
      style={{
        border: `1.5px solid ${active ? '#839788' : '#D4C8BC'}`,
        background: active ? '#839788' : 'transparent',
        color: active ? '#EEE0CB' : '#9A8A7A',
      }}
    >
      {label}
    </button>
  );
}
