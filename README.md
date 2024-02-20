# Imagely

Imagely is a website powered with AI, You can generate images **Using Generative AI**, **Enhance Images**, **Image Restore**,**Object Remove**, **Object Recolor**, **Background Remover**, And more all of that Using The power of AI.

# Requirements

- **Shadcn**
  - `npx shadcn-ui@latest add button`
  - `npx shadcn-ui@latest add sheet`
  - `npx shadcn-ui@latest add form`
  - `npx shadcn-ui@latest add select`
- **qs**
  - `npm install qs`
- **svix**
  - `npm install svix`

# What I Learned

- Implement `CRUD Operations`
- **Use Webhooks**: which makes the **data** that **clerk's DB stores** **connect** ( or be recognized ) with our **MongoDB**, Then we can acces from it.
- `debounce Input`: is a technique used to perform UX, it's basicly when the user types its wait an amount of time then display the user keystrokes, Where the regular Input its displayed every keystroke with no
  delay, this method will helps alot.

- `for more informations` <a href="https://dev.to/manishkc104/debounce-input-in-react-3726">check the link</a>

```TS
export const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout | null;
  return (...args: any[]) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};
```
