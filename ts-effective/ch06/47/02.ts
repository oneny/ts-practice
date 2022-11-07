import getGift from "./01";

type MySanta = ReturnType<typeof getGift> // SecretSanta
type MyName = Parameters<typeof getGift>[0] // SecretName