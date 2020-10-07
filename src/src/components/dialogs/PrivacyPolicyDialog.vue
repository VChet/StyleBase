<template>
  <base-dialog v-if="open" size="large" @close="$emit('close')">
    <template>
      <div class="dialog-title">Privacy Policy</div>

      <p>
        This Privacy Policy document contains types of information that is collected and recorded by StyleBase,
        accessible from https://stylebase.cc, and how we use it.
      </p>
      <p>
        If you have additional questions or require more information about our Privacy Policy, do not hesitate to
        contact us through email at <a href="mailto:feedback@stylebase.cc" rel="noopener">feedback@stylebase.cc</a>
      </p>
      <p>
        This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards
        to the information that they shared and/or collect in StyleBase. This policy is not applicable to any
        information collected offline or via channels other than this website.
      </p>
      <p>
        StyleBase follows a standard procedure of using log files. These files log visitors when they visit websites.
        The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service
        Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not
        linked to any information that is personally identifiable. The purpose of the information is for analyzing
        trends, administering the site and gathering demographic information.
      </p>
      <p>
        Like any other website, StyleBase uses 'cookies'. These cookies are used to store information including the
        pages on the website that the visitor accessed or visited. The information is used to optimize the users'
        experience by customizing our web page content based on visitors' browser type and/or other information.
      </p>
      <p>
        For more general information on cookies, please read the "What Are Cookies" article on
        <a href="https://www.cookieconsent.com/what-are-cookies/">Cookie Consent website</a>.
      </p>
      <p>By using our website, you hereby consent to our Privacy Policy.</p>

      <div class="dialog-buttons">
        <button class="style-button-filled" type="button" @click="$emit('close')">Close</button>
      </div>
    </template>
  </base-dialog>
</template>

<script>
import BaseDialog from '@/components/dialogs/BaseDialog';

export default {
  name: 'PrivacyPolicyDialog',
  components: {
    BaseDialog
  },
  props: {
    open: {
      type: Boolean,
      required: true,
      default: false
    }
  }
};
</script>

<style scoped lang="scss">
.dialog-title {
  font-size: 30px;
  margin-bottom: 1rem;
  text-align: center;
}

p {
  font-size: 18px;
  line-height: 28px;

  a {
    text-decoration: underline;
  }
}

.dialog-buttons {
  margin-top: 1.5rem;
  text-align: center;

  button {
    width: 170px;
    height: 50px;
    font-size: 18px;
  }
}
</style>
