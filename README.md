# Campus Notice Board — Deploy Practice

A small Node.js web app. On Day 1 you *ran* an app in the foreground with
`npm start`. Today you **deploy** it: make it keep running on its own, and
reach it from a real browser over the internet.

> Runs on your AWS Learner Lab EC2 (Amazon Linux 2023). Reminder: the public
> IP changes each lab session, and you must open the app's port in the
> security group to reach it from outside.

---

## 1. Get the code and its libraries
```
git clone https://github.com/ratiros01/CSTU_CYBERCAMP_2026_WEEK3_AWS_NPM.git
cd CSTU_CYBERCAMP_2026_WEEK3_AWS_NPM
npm install
```

## 2. First, run it the simple way (foreground)
```
npm start
```
In a second terminal:
```
curl http://localhost:3000/
```
You should get HTML back. Press `Ctrl+C` to stop it — and notice the problem:
**the moment you close the terminal, the app dies.** That's not a deployment.

## 3. Deploy it properly with pm2
`pm2` is a process manager — itself an npm package you install globally. It
keeps your app running in the background and restarts it if it crashes.

```
sudo npm install -g pm2
pm2 start app.js --name notice-board
pm2 status                 # should show "online"
pm2 logs notice-board      # live app output (Ctrl+C to stop watching)
```
Now the app runs even after you log out.

## 4. Make it reachable from your browser
1. In the EC2 console → your instance → **Security** → click the security
   group → **Edit inbound rules** → **Add rule**: Custom TCP, port **3000**,
   source **Anywhere (0.0.0.0/0)** *(training only)* → **Save**.
2. Find your instance's **public IP** (EC2 console, or run `curl -s ifconfig.me`).
3. In your own browser, visit: `http://<public-ip>:3000`

You should see the Notice Board page. **That's a deployment** — running on its
own, reachable from anywhere.

## 5. Survive a reboot (optional but real)
```
pm2 startup      # prints a command — copy/paste and run the line it gives you
pm2 save         # remember the current app list
```

## 6. Watch your web access log
Every request the app serves is written in **Apache "combined" format** —
the same shape as the `access.log` you'll analyse later in the camp.
```
tail -f logs/access.log
```
Refresh the browser page a few times, try a URL that doesn't exist
(`http://<public-ip>:3000/nope`), and watch the lines appear.

- Which IP shows up when *you* visit? (Hint: it's your own, not localhost.)
- What status code does a page that exists return? A missing one?

---

## Managing the app (pm2 cheatsheet)
```
pm2 status                 # is it running?
pm2 logs notice-board      # live logs
pm2 restart notice-board   # after a code change
pm2 stop notice-board      # stop it
pm2 delete notice-board    # remove it from pm2
```

## Clean up (Learner Lab hygiene)
```
pm2 delete notice-board
```
Then **Stop** the instance / **End Lab**. Next session: new public IP, and
you'll re-open port 3000.

## What you learned
- Foreground vs deployed: a real service keeps running without you.
- `npm install -g` installs a tool globally (pm2), vs local app dependencies.
- A deployed web app writes an **access log** of every request — that log is
  evidence, and reading it is the analyst skill you'll practise next.


---

## Flags (Day 1 — 4 to collect)
There are **four flags** hidden across today's milestones — cloning,
installing, deploying, and reading logs. Each one is proof you actually did
the step. Format: `CSTU{...}`. Your worksheet says which milestone each
belongs to; finding *where* is part of the exercise.
