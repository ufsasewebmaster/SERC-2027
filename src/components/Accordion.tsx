"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";

export type AccordionItem = { title: string; content: React.ReactNode; icon?: React.ReactNode };

export default function Accordion({
  items,
  colors = ["bg-paper"],
  allowMultiple = true,
}: {
  items: AccordionItem[];
  /** Background classes cycled across items. */
  colors?: string[];
  allowMultiple?: boolean;
}) {
  const [open, setOpen] = useState<Set<number>>(new Set());
  const baseId = useId();

  function toggle(i: number) {
    setOpen((prev) => {
      const next = new Set(allowMultiple ? prev : []);
      if (prev.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  return (
    <ul className="space-y-4">
      {items.map((item, i) => {
        const isOpen = open.has(i);
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;
        return (
          <li key={item.title} className={`sticker overflow-hidden ${colors[i % colors.length]}`}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                className="flex w-full items-center gap-4 px-5 py-4 text-left sm:px-6"
              >
                {item.icon}
                <span className="flex-1 font-heading text-lg font-semibold sm:text-xl">{item.title}</span>
                <span
                  aria-hidden="true"
                  className={`grid size-9 shrink-0 place-items-center rounded-full border-[3px] border-ink bg-paper text-xl font-bold transition-transform duration-300 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                >
                  <div className="border-t-[3px] border-dashed border-ink/40 px-5 pt-4 pb-5 text-[1.05rem] leading-relaxed sm:px-6">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
