#!/usr/bin/env python
import json
import random

ALPHABET = "abcdefghijklmnopqrstuvwxyz"
salty_alphabet = ""

# load key/value pairs into memory
with open("key_value_pairs.json") as json_data:
    salty_pairs = json.load(json_data)

def salty_encode():
    while True:
        input_contains_letters = False
        salty_output = ""

        # Get input from user to encode
        salty_input = input("\nencode> ")

        # As of now, all characters must be lowercase
        salty_input = salty_input.lower()

        # If the input is 'exit', return to the main menu
        if salty_input == "exit":
            return
       
# ENCODING STARTS HERE
        # Pick a random key/alphabet pair from the salt pile
        pair_x = random.randrange(0,26)
        pair_y = random.randrange(0,26)
        random_pair = "{:s}{:s}".format(ALPHABET[pair_x], ALPHABET[pair_y])
        salty_alphabet = salty_pairs[random_pair]

        # For each letter in the input,
        for character in salty_input:
            letter_found = False

            # Scan through the alphabet to find the
            #    index of the letter in the scrambled alphabet.
            # Add the scrambled character to the output string.
            for i in range(0,25):
                if character == ALPHABET[i]:
                    letter_found = True
                    input_contains_letters = True
                    salty_output += salty_alphabet[i]
                    break

            # The encoder currently does not encode
            #     non-alphabet characters.
            if not letter_found:
                salty_output += character

        # input_contains_letters
        # This conditional depends on the presence of letters.
        #
        # If the input is, for example, "...?!?!"
        # The output normally would be: "[key]...?!?!"
        #
        # Since we don't want to give away the secret behind the 
        #     encryption, the program will not print a key when
        #     there is no translation being performed.
        if input_contains_letters:
            print (random_pair + salty_output)
        else:
            print (salty_output)


def salty_decode():
    while True:
        input_contains_letters = False
        salty_pair = ""
        salty_output = ""

        # Get input from user to decode
        salty_input = input("\ndecode> ")

        # If the input is 'exit', return to the main menu
        if salty_input == "exit":
            return
       
# DECODING STARTS HERE
        # This exception handler skips translation
        #     if there is no valid salt.
        try:
            salty_alphabet = salty_pairs[salty_input[0:2]]
        
        except KeyError:
            print (salty_input)
        
        else:
            # for each letter in the input,
            for character in salty_input:
                letter_found = False

                # scan through the scrambled alphabet to find the
                #    index of the letter in the alphabet.
                # add the character to the output string.
                for i in range(0,25):
                    if character == salty_alphabet[i]:
                        letter_found = True
                        input_contains_letters = True
                        salty_output += ALPHABET[i]
                        break

                # the encoder currently does not decode
                #     non-alphabet characters.
                if not letter_found:
                    salty_output += character

            print (salty_output[2:])



if __name__ == "__main__":
    while True:
        print ("\nSALTY MESSENGER\n")

        print ("1. Encode")
        print ("2. Decode")
        print ("3. Exit")
        
        try:
            choice = int(input("\n> "))

        except ValueError:
            print("Error: not a number.")
            exit(1)

        if choice == 1:
            salty_encode()
        elif choice == 2:
            salty_decode()
        elif choice == 3:
            exit()