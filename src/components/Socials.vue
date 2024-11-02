<template>
  <section class="socials">
    <a
      href="https://twitter.com/sirdugs"
      target="_blank"
      aria-label="My Twitter Profile"
    >
      <vue-feather type="twitter" />
    </a>
    <a
      href="https://github.com/dhershman1"
      target="_blank"
      aria-label="My Github Profile"
    >
      <vue-feather type="github" />
    </a>
    <a
      href="https://www.linkedin.com/in/dustin-hershman/"
      target="_blank"
      aria-label="My LinkedIn Profile"
    >
      <vue-feather type="linkedin" />
    </a>
    <a
      href="https://bsky.app/profile/dhershman.bsky.social"
      target="_blank"
      aria-label="My BlueSky Profile"
    >
      <vue-feather type="at-sign" />
    </a>
  </section>
</template>

<style scoped>
.socials {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}
</style>
