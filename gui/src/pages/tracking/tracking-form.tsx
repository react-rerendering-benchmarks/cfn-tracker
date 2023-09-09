import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

import { CFNMachineContext } from "@/main/machine";
import { GetAvailableLogs } from "@@/go/core/CommandHandler";

import { ActionButton } from "@/ui/action-button";
import { Checkbox } from "@/ui/checkbox";

export const TrackingForm: React.FC = () => {
  const { t } = useTranslation();
  const [_, send] = CFNMachineContext.useActor();

  const cfnInputRef = React.useRef<HTMLInputElement>(null);
  const restoreRef = React.useRef<HTMLInputElement>(null);

  const [cfnInput, setCfnInput] = React.useState<string>("")
  const [oldCfns, setOldCfns] = React.useState<string[] | null>(null);

  React.useEffect(() => {
    GetAvailableLogs().then(logs => setOldCfns(logs));
  }, []);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (cfnInput == "") return;
    send({
      type: "submit",
      cfn: cfnInput, 
      restore: restoreRef.current && restoreRef.current.checked,
    });
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.125 }}
      className="relative h-full overflow-y-scroll overflow-x-visible w-full justify-self-center flex flex-col pt-12 gap-5 px-40 pb-4"
      onSubmit={onSubmit}
    >
      <h3 className="text-lg">{t("enterCfnName")}</h3>
      <input
        ref={cfnInputRef}
        onChange={e => setCfnInput(e.target.value)}
        className="bg-transparent border-b-2 border-0 focus:ring-offset-transparent focus:ring-transparent border-b-[rgba(255,255,255,0.275)] focus:border-white hover:border-white outline-none focus:outline-none hover:text-white transition-colors py-3 px-4 block w-full text-lg text-gray-300"
        type="text"
        placeholder={t("cfnName")!}
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        autoSave="off"
      />
      {oldCfns && (
        <div className="flex flex-wrap gap-2 content-center items-center text-center">
          {oldCfns.map(cfn => (
            <button
              key={cfn}
              type="button"
              onClick={(_) => {
                if (cfnInputRef.current) {
                  cfnInputRef.current.value = cfn;
                  setCfnInput(cfn)
                }
              }}
              className="whitespace-nowrap bg-[rgb(255,255,255,0.075)] hover:bg-[rgb(255,255,255,0.125)] text-base rounded-2xl transition-all items-center px-3 pt-1"
            >
              {cfn}
            </button>
          ))} 
        </div>
      )}
      <footer className="flex items-center w-full">
        {oldCfns && oldCfns.includes(cfnInput) &&
          <div className="group flex items-center">
            <Checkbox ref={restoreRef} id="restore-session"/> 
            <label htmlFor="restore-session" className="text-lg cursor-pointer text-gray-300 group-hover:text-white transition-colors">
              {t("restoreSession")}
            </label>
          </div>
        }
        <ActionButton 
          type="submit" 
          style={{ filter: "hue-rotate(-65deg)" }}
          className="ml-auto"
        >
          {t("start")}
        </ActionButton>
      </footer>
    </motion.form>
  );
};