interface Props {
  value: number | null;
  onChange: (value: number) => void;
  accent?: string;
}

export default function IntensityStepper({ value, onChange, accent = '#839788' }: Props) {
  const v = value ?? 0;
  const dots = [1, 2, 3, 4, 5];

  const btnStyle = (disabled: boolean): React.CSSProperties => ({
    width: 36,
    height: 36,
    borderRadius: 10,
    border: `1.5px solid ${disabled ? '#E2D1B6' : accent}`,
    background: disabled ? 'transparent' : `${accent}12`,
    color: disabled ? '#E2D1B6' : accent,
    fontSize: 20,
    fontWeight: 700,
    cursor: disabled ? 'default' : 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Source Sans 3', sans-serif",
    transition: 'all 0.15s ease',
    lineHeight: 1,
  });

  return (
    <div className="flex items-center gap-3 w-full">
      <button
        onClick={() => v > 0 && onChange(v - 1)}
        disabled={v === 0}
        aria-label="Decrease"
        style={btnStyle(v === 0)}
      >
        −
      </button>

      <div className="flex-1 flex items-center justify-center gap-1.5">
        {dots.map((dot) => (
          <div
            key={dot}
            className="rounded-full transition-all duration-200"
            style={{
              width: dot <= v ? 10 : 7,
              height: dot <= v ? 10 : 7,
              background: dot <= v ? accent : '#E2D1B6',
            }}
          />
        ))}
      </div>

      <span
        className="min-w-[28px] text-center font-extrabold text-xl font-display"
        style={{ color: accent }}
      >
        {v}
      </span>

      <button
        onClick={() => v < 5 && onChange(v + 1)}
        disabled={v === 5}
        aria-label="Increase"
        style={btnStyle(v === 5)}
      >
        +
      </button>
    </div>
  );
}
