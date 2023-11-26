import random

def lofi_effect(char):
    if random.choice([True, False]):
        return char.lower()
    else:
        return char.upper()

original = "Art"
lofi_art = "".join(map(lofi_effect, original))
