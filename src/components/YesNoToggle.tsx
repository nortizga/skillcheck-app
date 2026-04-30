interface Props {
  value: boolean | null;
  onChange: (value: boolean) => void;
  yesLabel?: string;
  noLabel?: string;
}

export default function YesNoToggle({ value, onChange, yesLabel = 'Yes', noLabel = 'No' }: Props) {
  return (
    <div className="flex gap-1.5">
      {([false, true] as const).map((opt) => {
        const active = value === opt;
        const isYes = opt === true;
        return (
          <button
            key={String(opt)}
            onClick={() => onChange(opt)}
            className="px-[18px] py-[7px] rounded-full text-[13px] font-semibold font-body transition-all duration-200 cursor-pointer"
            style={{
              border: `2px solid ${active ? (isYes ? '#A07A6B' : '#839788') : '#D4C8BC'}`,
              background: active ? (isYes ? '#F0DDD5' : '#E8F0EA') : 'transparent',
              color: active ? (isYes ? '#A07A6B' : '#6b7f70') : '#BAA898',
            }}
          >
            {opt ? yesLabel : noLabel}
          </button>
        );
      })}
    </div>
  );
}
