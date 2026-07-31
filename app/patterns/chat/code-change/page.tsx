'use client'

import { GitPullRequestIcon } from 'lucide-react'

import { CodeChange } from '@/components/app/code-change'

import { CodeChange as CodeChangeData } from '@/data/messages'

const fileChangeUsers: CodeChangeData = {
    files: [
        {
            code: `- def get_user(id):
+ def get_user(id: int) -> User:
+     """Fetch a user by id."""
  user = db.query(User).filter(User.id == id).first()
  if user is None:
      raise NotFound()
  return user`,
            filename: 'users.py',
            language: 'diff',
        },
    ],
    style: 'single',
}

const actionableSingle: CodeChangeData = {
    actions: [
        { label: 'Review', variant: 'secondary' },
        { icon: GitPullRequestIcon, label: 'Create pull request', variant: 'primary' },
    ],
    files: [
        {
            code: `- def get_user(id):
+ def get_user(id: int) -> User:
+     """Fetch a user by id."""
  user = db.query(User).filter(User.id == id).first()
  if user is None:
      raise NotFound()
  return user`,
            filename: 'users.py',
            language: 'diff',
        },
    ],
    style: 'group',
}

const actionableGroup: CodeChangeData = {
    actions: [
        { label: 'Review', variant: 'secondary' },
        { icon: GitPullRequestIcon, label: 'Create pull request', variant: 'primary' },
    ],
    files: [
        {
            code: `- def get_user(id):
+ def get_user(id: int) -> User:
+     """Fetch a user by id."""
  user = db.query(User).filter(User.id == id).first()
  if user is None:
      raise NotFound()
  return user`,
            filename: 'users.py',
            language: 'diff',
        },
        {
            code: `- def login(email, password):
-     user = User.query.filter_by(email=email).first()
-     return user.token
+ def login(email: str, password: str) -> str:
+     user = User.query.filter_by(email=email).first()
+     if not user or not user.check_password(password):
+         raise AuthError("Invalid credentials")
+     return create_token(user.id)`,
            filename: 'auth.py',
            language: 'diff',
        },
    ],
    style: 'group',
}

function Page() {
    return (
        <div className="flex flex-col gap-4 mx-auto max-w-3xl w-full">
            <h1 className="text-3xl font-bold">Code change</h1>
            <h2 className="text-md font-bold">File change</h2>
            <CodeChange {...fileChangeUsers} />

            <h2 className="text-md font-bold">Actionable</h2>
            <CodeChange {...actionableSingle} />
            <CodeChange {...actionableGroup} />
        </div>
    )
}

export default Page
