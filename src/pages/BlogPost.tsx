import DOMPurify from "dompurify";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { BlogPostData } from "@/types/blog";
import "@/components/tiptap/tiptap.css";
import { Footer } from "@/components/layouts/Footer";
import { Navbar } from "@/components/layouts/Navbar";

// Dummy data
// const dummyBlog: BlogPostData = {
//   title: "Why You Should Learn TypeScript in 2025<script>alert('hacked')</script>",
//   content: `<script>alert('hacked')</script><script>alert('hacked')</script><script>alert('hacked')</script>
//   <img src="https://bytestack-images-2025-2005.s3.ap-south-1.amazonaws.com/blog-images/67e6f98faae4bdeeda62bc78/4a1e36b2-511c-4a88-8bff-18ea0bc09ca3.png" width="100%" align="center" caption="" aspectratio="2.1646191646191646">
//   <script>alert('hacked')</script><p>TypeScript (TS) has taken the programming world by storm, especially for JavaScript developers looking to level up their skills. As web applications grow more complex, TypeScript provides a robust solution to managing large codebases while enhancing productivity. In this blog, we'll dive deep into TypeScript, its benefits, features, and how it enhances the development experience.</p><h2><strong>What is TypeScript?</strong></h2><p>TypeScript is a statically-typed superset of JavaScript. Developed and maintained by Microsoft, TypeScript introduces optional static types to JavaScript, which allows developers to catch errors early during development and make code more readable and maintainable.</p><p>JavaScript is a dynamic language, meaning the types of variables can change at runtime. TypeScript, on the other hand, allows for static type-checking, making it possible to define the types of variables, function parameters, and return values explicitly. This helps identify potential issues at compile time rather than runtime, reducing bugs and improving the overall development experience.</p><h3><strong>Why Use TypeScript?</strong></h3><ol class="list-decimal"><li><p><strong>Type Safety</strong>: The primary reason to use TypeScript is the static typing system. It helps developers catch errors early in the development process, making it easier to identify bugs that could otherwise go unnoticed in a JavaScript codebase.</p></li><li><p><strong>Improved IDE Support</strong>: TypeScript provides better support for Integrated Development Environments (IDEs). The added type information improves code completion, navigation, and inline documentation, significantly boosting developer productivity.</p></li><li><p><strong>Enhanced Readability and Maintainability</strong>: Type annotations and interfaces enhance the readability of code, making it easier to understand the purpose of functions, variables, and objects. This is particularly useful when working with larger teams or maintaining long-term projects.</p></li><li><p><strong>Object-Oriented Programming (OOP)</strong>: TypeScript supports features like classes, interfaces, and inheritance, making it ideal for developers coming from OOP languages like Java, C++, or Python. The ability to define interfaces and enforce structure makes it easier to design large-scale applications.</p></li><li><p><strong>Seamless JavaScript Integration</strong>: TypeScript is a superset of JavaScript, meaning any valid JavaScript code is also valid TypeScript. This makes transitioning from JavaScript to TypeScript seamless. You can gradually adopt TypeScript in your existing JavaScript codebase.</p></li><li><p><strong>Better Refactoring</strong>: TypeScript's static types make refactoring safer and easier. With types explicitly defined, developers can confidently make changes to the code without breaking functionality.</p></li></ol><h3><strong>Key Features of TypeScript</strong></h3><ol class="list-decimal"><li><p><strong>Static Typing</strong>: Types are checked at compile time, reducing the number of runtime errors. Developers can specify types for variables, parameters, and return values.</p><pre><code class="language-typescript">let message: string = "Hello, TypeScript!";</code></pre></li><li><p><strong>Interfaces</strong>: TypeScript allows defining custom types using interfaces. Interfaces are a powerful way to enforce structure in your code.</p><script>alert('hacked')</script><pre><code class="language-typescript">interface Person {
//   name: string;
//   age: number;
// }

// const john: Person = {
//   name: "John",
//   age: 30,
// };</code><script>alert('hacked')</script></pre></li><li><p><strong>Generics</strong>: TypeScript supports generics, which enable writing flexible and reusable code. Generics allow you to write functions or classes that work with different data types while maintaining type safety.</p><pre><code class="language-typescript">function identity&lt;T&gt;(arg: T): T {
//   return a
//   rg;
// }
//   <script>alert('hacked')</script>
//   <script>alert('hacked')</script><script>alert('hacked')</script>

// let result = identity&lt;string&gt;("Hello");</code></pre></li><li><p><strong>Enums</strong>: TypeScript has built-in support for enums, which are a way to define a set of named constants.</p><pre><code class="language-typescript">enum Direction {
//   Up = "UP",
//   Down = "DOWN",
//   Left = "LEFT",
//   Right = "RIGHT",
// }</code></pre></li><li><p><strong>Type Inference</strong>: TypeScript can infer types even without explicit type annotations. This allows developers to write less code without sacrificing type safety.</p><pre><code class="language-typescript">let x = 5; // TypeScript infers that 'x' is of type 'number'</code></pre></li><li><p><strong>Type Aliases</strong>: Type aliases allow you to create custom types with a given name, which can be used throughout the application.</p><pre><code class="language-typescript">type StringOrNumber = string | number;
// let value: StringOrNumber = 10;</code></pre></li></ol><h3><strong>Benefits of TypeScript</strong></h3><ul class="list-disc"><li><p><strong>Catch Errors Early</strong>: TypeScript's static typing system helps catch bugs early in development, reducing runtime errors.</p></li><li><p><strong>Easier Collaboration</strong>: With clear types, developers can easily understand the data structures and interfaces, making it easier to work in teams.</p></li><li><p><strong>Better Code Completion and IntelliSense</strong>: Modern IDEs provide excellent support for TypeScript, offering better auto-completion, hints, and documentation, enhancing productivity.</p></li><li><p><strong>Scalability</strong>: TypeScript's static typing and features like interfaces and generics help you scale projects more easily. It's particularly useful when building large applications where managing complex relationships between different parts of the code is critical.</p></li></ul><h3><strong>How to Get Started with TypeScript</strong></h3><ol class="list-decimal"><li><p><strong>Install TypeScript</strong>: The first step in getting started with TypeScript is installing it. You can do this globally via npm:</p><pre><code class="language-bash">npm install -g typescript</code></pre></li><li><p><strong>Set Up a TypeScript Project</strong>: Initialize a new TypeScript project by creating a <code>tsconfig.json</code> file, which contains configuration options for the TypeScript compiler.</p><pre><code class="language-bash">tsc --init</code></pre></li><li><p><strong>Write TypeScript Code</strong>: Create <code>.ts</code> files and write TypeScript code. For example, <code>app.ts</code>:</p><pre><code class="language-typescript">const greet = (name: string) => \`Hello, \${name}\`;
// console.log(greet("World"));</code></pre></li><li><p><strong>Compile TypeScript Code</strong>: Compile TypeScript into JavaScript using the <code>tsc</code> command:</p><pre><code class="language-bash">tsc app.ts</code></pre></li><li><p><strong>Run JavaScript</strong>: After compiling the TypeScript code into JavaScript, run it in a Node.js or browser environment.</p></li></ol><h3><strong>When to Use TypeScript</strong></h3><ul class="list-disc"><li><p><strong>Large-scale applications</strong>: TypeScript is perfect for projects that involve complex codebases and large teams. It helps enforce structure and reduces the likelihood of errors as the project grows.</p></li><li><p><strong>React or Angular development</strong>: Both React and Angular have great support for TypeScript, and using TypeScript with these frameworks can improve your experience by providing better error checking and autocompletion.</p></li><li><p><strong>Node.js backends</strong>: TypeScript can be used effectively on the server side as well. It provides powerful tools for writing clean, maintainable backend code in frameworks like Express.</p></li></ul><h3><strong>Conclusion</strong></h3><p>TypeScript brings a wealth of benefits to JavaScript development, especially for large-scale applications where maintainability, scalability, and error prevention are critical. It offers type safety, enhanced IDE support, and better tooling that makes development more productive. Whether you're building a simple web app or a complex enterprise solution, learning TypeScript is a smart choice to improve your code quality and development workflow.</p><p>If you haven't yet explored TypeScript, now is the perfect time to dive in and experience the advantages it offers. Happy coding!</p>`,
//   metaDescription:
//     "TypeScript (TS) has taken the programming world by storm, especially for JavaScript developers looking to level up their skills. As web applications grow more c",
//   tags: [],
//   topics: [],
//   isPremium: true,
//   status: "draft",
//   readTime: "7 min",
// };

const dummyBlog: BlogPostData = {
  title: `Why You Should Learn TypeScript in 2025`,
  content: `
    <img src="x" onerror="alert('XSS in image error')">
    <svg/onload=alert('XSS in SVG')>
    <script>alert('XSS in title!')</script>
    <iframe src="javascript:alert('XSS in iframe')"></iframe>
    <input autofocus onfocus=alert('XSS in input focus')>
    <a href="javascript:alert('XSS in href')">Click me</a>
    <div onclick="alert('XSS in div click')">Click here</div>
    <math><mtext><script>alert('XSS in MathML')</script></mtext></math>
    <form><button formaction="javascript:alert('XSS in form submit')">Submit</button></form>
    <object data="javascript:alert('XSS in object')"></object>
    <video><source onerror="alert('XSS in video error')"></video>
    <details open ontoggle="alert('XSS in details toggle')"><summary>XSS</summary></details>
    <style>@keyframes x{}</style><div style="animation-name:x" onanimationstart="alert('XSS via animation')"></div>

    <p>This is normal content, followed by a sneaky script:</p>
    <script>alert('XSS in content')</script>
  `,
  metaDescription: "TypeScript blog with XSS testing payloads",
  tags: ["security", "xss", "typescript"],
  topics: ["Web Security"],
  isPremium: true,
  status: "draft",
  readTime: "7 min",
};

const BlogPost = () => {
  const [blog] = useState<BlogPostData>(dummyBlog);

  return (
    <>
      <Helmet>
        <title>{blog.title} | ByteStack</title>
        <meta name="description" content={blog.metaDescription} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.metaDescription} />
        <meta property="og:type" content="article" />
      </Helmet>

      <Navbar />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <article className="ProseMirror w-full mx-auto">
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-4">
                {blog.title}
              </h1>
              <div className="flex items-center space-x-4 text-muted-foreground">
                <span>{blog.readTime}</span>
                {blog.isPremium && (
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    Premium
                  </span>
                )}
              </div>
            </header>

            <div
              className="ProseMirror prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(blog.content),
              }}
            />
          </article>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogPost;
