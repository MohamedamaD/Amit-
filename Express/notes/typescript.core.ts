// Basic Types – number, string, boolean, any, void, undefined, null

const var_string: string = "";
const var_number: number = 0;
const var_boolean: boolean = false;
const var_undefined: undefined = undefined;
const var_null: null = null;
let var_any: any = 0;
var_any = "2"

function fn(): number | string { return 0 }

// Arrays & Tuples – string[], [number, string]

const arr_strings: string[] = []
const arr_numbers: number[] = []

const tuple: [string, number] = ["mohamed", 0]

// Enums – enum Direction { Up, Down }

enum Direction {
    Up,
    Down,
    Right
}

// Functions – return types, optional parameters
function fn_(name?: string): number | string { return 0 }

// Interfaces & Types – describing objects, function shapes, etc.

type User = { username: string, id: number }
function getUserById(id: number): User | null {
    return { username: "", id: 0 }
}
const user: User = { username: "mohamed", id: 1 }


interface IProduct { name: string, id: number }

class Product implements IProduct {
    name: string
    id: number
}

// Classes & Access Modifiers – public, private, protected

class Order {
    public id: number
    private name: string

    constructor(id: number, name: string) {
        this.id = id
        this.name = name
    }

    setName(name: string) {
        this.name = name
    }
    getName() {
        return this.name
    }
}

// Generics – reusable code with types


function swap<T>(arg_1: T, arg_2: T): void {
    const arg_3 = arg_1
    arg_1 = arg_2
    arg_2 = arg_3
}

function identity<T>(arg: T): T {
    return arg
}

identity<string>("mohamed")
identity<number>(0)

// Type Inference – how TypeScript guesses the type if not declared

// Modules & Imports / Exports

// import * from ""
// normal export 