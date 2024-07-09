import { FormEvent, useState, useEffect, ButtonHTMLAttributes } from "react"
import { useCountdown } from "@/src/hooks/useCountdown"

function BaseButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="bg-orange-400 text-gray-100 min-w-52 capitalize"
      {...props}
    />
  )
}
function CountdownButton(props: {
  onClick: () => void
  className?: string
  seconds: number
}) {
  const time = useCountdown(props.seconds)
  const { onClick, ...rest } = props

  useEffect(() => {
    if (time === 0) {
      onClick()
    }
  }, [time, onClick])

  return (
    <BaseButton type="button" onClick={onClick} {...rest}>
      ({time}) Looks good to me
    </BaseButton>
  )
}

interface FormScreenProps {
  onSubmit: (val: string) => void
}

export function FormScreen(props: FormScreenProps) {
  const [username, setUsername] = useState("")
  const [step, setStep] = useState("IDLE")

  function handleForm(e: FormEvent) {
    e.preventDefault()
    setStep("PENDING_SUBMISSION")
  }

  function handleSubmit() {
    setStep("SUBMITTED")
    props.onSubmit(username)
  }

  return (
    <>
      {step === "IDLE" ? (
        <form id="submit-form">
          <div className="flex flex-col mb-4">
            <label
              htmlFor="username-input"
              className="self-start pb-2 capitalize text-teal-400 text-lg font-bold"
            >
              username
            </label>
            <input
              id="username-input"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              autoComplete="off"
              className="bg-orange-200 text-gray-600 p-2 outline-teal-400"
            />
          </div>

          <BaseButton
            type="submit"
            form="submit-form"
            onClick={handleForm}
            disabled={!username}
          >
            submit
          </BaseButton>
        </form>
      ) : null}

      {step === "PENDING_SUBMISSION" ? (
        <CountdownButton onClick={handleSubmit} seconds={8} />
      ) : null}

      {step === "SUBMITTED" ? (
        <p className="text-orange-400 font-bold capitalize text-3xl">
          all done!
        </p>
      ) : null}
    </>
  )
}
