'use client'

import { useState } from 'react'
import { motion, Variants, Transition } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { ChevronDown } from 'lucide-react'
import {
  MessageCircle,
  ShieldCheck,
  Brain,
  Zap,
  Send,
  FileSearch,
  UserCheck,
  Lock,
  Globe,
} from 'lucide-react'

export default function InfoHomePage() {
  const [language, setLanguage] = useState('en')

  const scrollToForm = () => {
    // Implement smooth scroll to form section
    console.log('Scrolling to form')
  }

  const fadeInUp: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    // transition: { duration: 0.6 }
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <main className="pt-20">
        <section className="relative flex items-center justify-center text-center px-4">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-900 opacity-50" />
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerChildren}
            className="relative z-10 max-w-4xl mx-auto"
          >
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl font-bold mb-6">
              Anonymous Communication Made Simple
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl md:text-2xl mb-8">
              Share your thoughts securely and receive AI-assisted responses
            </motion.p>
            <motion.div variants={fadeInUp} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={scrollToForm}
                size="lg"
                className="bg-blue-500 hover:bg-blue-600 text-white text-lg px-8 py-3 rounded-full"
              >
                Start Messaging Now
              </Button>
            </motion.div>
          </motion.div>
        </section>

        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          id="features"
          className="py-20 bg-gray-800"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            <motion.div
              variants={staggerChildren}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {[
                { icon: ShieldCheck, title: "100% Anonymous", description: "Your identity remains completely protected" },
                { icon: Brain, title: "AI-Assisted Responses", description: "Get intelligent reply suggestions" },
                { icon: Lock, title: "Secure Platform", description: "State-of-the-art encryption for your messages" },
                { icon: Zap, title: "Easy to Use", description: "Simple interface for quick communication" }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-gray-700 p-6 rounded-lg text-center hover:bg-gray-600 transition-colors"
                >
                  <feature.icon className="h-12 w-12 mx-auto mb-4 text-blue-400" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          id="how-it-works"
          className="py-20 bg-gray-900"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <motion.div
              variants={staggerChildren}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {[
                { icon: Send, title: "Compose Your Message", description: "Write your message anonymously" },
                { icon: Brain, title: "AI Analysis", description: "Our AI suggests appropriate responses" },
                { icon: UserCheck, title: "Admin Review", description: "A human admin reads and responds" },
                { icon: Lock, title: "Secure Delivery", description: "Responses are safely delivered to you" }
              ].map((step, index) => (
                <motion.div key={index} variants={fadeInUp} className="flex flex-col items-center text-center">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="bg-blue-500 rounded-full p-4 mb-4"
                  >
                    <step.icon className="h-8 w-8 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-300">{step.description}</p>
                  {index < 3 && (
                    <ChevronDown className="h-8 w-8 text-blue-400 mt-4 hidden lg:block" />
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          id="testimonials"
          className="py-20 bg-gray-800"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
            <motion.div
              variants={staggerChildren}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[
                { name: "Alex", comment: "Mis Messages helped me communicate sensitive information securely. The AI suggestions were spot-on!" },
                { name: "Sam", comment: "I love how easy it is to use. The anonymity gives me peace of mind when sharing my thoughts." },
                { name: "Jordan", comment: "The response time is incredible. I got the advice I needed quickly and discreetly." }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-700 p-6 rounded-lg"
                >
                  <p className="text-lg mb-4">"{testimonial.comment}"</p>
                  <p className="font-semibold text-blue-400">- {testimonial.name}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          id="faq"
          className="py-20 bg-gray-900"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <motion.div
              variants={staggerChildren}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {[
                { question: "Is my identity really anonymous?", answer: "Yes, we use advanced encryption and never store personally identifiable information." },
                { question: "How does the AI assistance work?", answer: "Our AI analyzes the content of your message and suggests appropriate responses based on context." },
                { question: "Can I trust the human admins?", answer: "All our admins are thoroughly vetted and bound by strict confidentiality agreements." },
                { question: "Is there a limit to message length?", answer: "Messages can be up to 5000 characters long to ensure comprehensive communication." }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                  className="bg-gray-800 p-6 rounded-lg"
                >
                  <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
                  <p className="text-gray-300">{faq.answer}</p>
                </motion.div>
              ))}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center mt-8"
            >
              <Button variant="outline" className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white">
                View Full FAQ
              </Button>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="py-20 bg-blue-600 text-white"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold mb-4"
            >
              Ready to Send Your First Message?
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl mb-8"
            >
              Experience the power of anonymous communication with AI assistance.
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={scrollToForm}
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3 rounded-full"
              >
                Get Started Now
              </Button>
            </motion.div>
          </div>
        </motion.section>
      </main>

      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="bg-gray-800 text-gray-300 py-12"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Mis Messages</h3>
              <p>&copy; 2024 Mis Messages. All rights reserved.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
                <li><a href="/contact" className="hover:text-blue-400 transition-colors">Contact Us</a></li>
                <li><a href="/faq" className="hover:text-blue-400 transition-colors">Full FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                  <span className="sr-only">GitHub</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 pt-8 border-t border-gray-700 flex items-center justify-between"
          >
            <p className="text-sm">Designed with ❤️ for anonymous communication</p>
            <div className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-blue-400" />
              <span className="text-sm font-medium">Global Reach, Local Trust</span>
            </div>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  )
}