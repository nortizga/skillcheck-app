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
              border: `2px solid ${
                active
                  ? isYes ? '#412234' : '#7AAD7D'
                  : '#C5E0C6'
              }`,
              background: active
                ? isYes ? '#412234' : '#BDD9BF'
                : 'transparent',
              color: active
                ? isYes ? '#ffffff' : '#2E4052'
                : '#7AAD7D',
            }}
          >
            {opt ? yesLabel : noLabel}
          </button>
        );
      })}
    </div>
  );
}
