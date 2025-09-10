"use client";

import { CheckIcon, CopyIcon, DownloadIcon } from "lucide-react";
import {
  type ComponentProps,
  createContext,
  type HTMLAttributes,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { highlightAll } from "@speed-highlight/core";

// Tipos de lenguajes web soportados por Speed Highlight
export type WebLanguage = 
  // Core web languages
  | "html" | "css" | "javascript" | "typescript" | "jsx" | "tsx"
  // Web frameworks and libraries
  | "vue" | "svelte" | "astro" | "angular-html" | "angular-ts" | "glimmer-js" | "glimmer-ts"
  // Styling and templating
  | "scss" | "sass" | "less" | "stylus" | "postcss" | "handlebars" | "hbs" | "pug" | "jade" | "haml" | "liquid" | "twig" | "erb" | "blade" | "razor" | "edge" | "templ"
  // Configuration and data
  | "json" | "jsonc" | "json5" | "yaml" | "yml" | "toml" | "ini" | "dotenv"
  // Build tools and configs
  | "dockerfile" | "docker" | "makefile" | "make" | "cmake" | "nginx" | "apache" | "git-commit" | "git-rebase" | "codeowners"
  // Documentation
  | "markdown" | "md" | "mdx" | "asciidoc" | "adoc" | "rst"
  // Shell and scripting
  | "bash" | "sh" | "shell" | "shellscript" | "powershell" | "ps1" | "fish" | "zsh"
  // Database
  | "sql" | "graphql" | "gql" | "prisma"
  // Other useful web languages
  | "xml" | "xsl" | "regex" | "regexp" | "diff" | "log" | "csv" | "tsv"
  // HTTP and APIs
  | "http"
  // Mermaid diagrams
  | "mermaid" | "mmd";
import { cn, save } from "./utils";

type CodeBlockProps = HTMLAttributes<HTMLDivElement> & {
  code: string;
  language: WebLanguage;
  preClassName?: string;
};

type CodeBlockContextType = {
  code: string;
};

const CodeBlockContext = createContext<CodeBlockContextType>({
  code: "",
});

export const CodeBlock = ({
  code,
  language,
  className,
  children,
  preClassName,
  ...rest
}: CodeBlockProps) => {
  const codeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Apply highlighting after component mounts
    if (codeRef.current) {
      
      // Use setTimeout to ensure DOM is ready
      setTimeout(() => {
        try {
          highlightAll();
          
          // Check if highlighting worked
          const highlightedElements = codeRef.current?.querySelectorAll('[class*="shj-"]');
        } catch (error) {
          console.error('Speed Highlight error:', error);
        }
      }, 100);
    }
  }, [code, language]);

  return (
    <CodeBlockContext.Provider value={{ code }}>
      <div
        className="my-4 w-full overflow-hidden rounded-xl border"
        data-code-block-container
        data-language={language}
      >
        <div
          className="flex items-center justify-between bg-muted/80 p-3 text-muted-foreground text-xs"
          data-code-block-header
          data-language={language.replace('javascript', 'js').replace('typescript', 'ts')}
        >
          <span className="ml-1 font-mono lowercase">{language}</span>
          <div className="flex items-center gap-2">{children}</div>
        </div>
        <div className="w-full">
          <div className="min-w-full">
            <div className={cn("overflow-x-auto", className)} {...rest}>
              <div
                ref={codeRef}
                className={`shj-lang-${language.replace('javascript', 'js').replace('typescript', 'ts')}  ${preClassName || ''}`}
                data-code-block
                data-language={language.replace('javascript', 'js').replace('typescript', 'ts')}
                style={{ fontSize: '14px' }} 
              >
                {code}
              </div>
            </div>
          </div>
        </div>
      </div>
    </CodeBlockContext.Provider>
  );
};

export type CodeBlockCopyButtonProps = ComponentProps<"button"> & {
  onCopy?: () => void;
  onError?: (error: Error) => void;
  timeout?: number;
};

export type CodeBlockDownloadButtonProps = ComponentProps<"button"> & {
  onDownload?: () => void;
  onError?: (error: Error) => void;
};

const languageExtensionMap: Partial<Record<WebLanguage, string>> = {
  // Core web languages
  html: "html",
  css: "css",
  javascript: "js",
  typescript: "ts",
  jsx: "jsx",
  tsx: "tsx",
  
  // Web frameworks and libraries
  vue: "vue",
  svelte: "svelte",
  astro: "astro",
  "angular-html": "html",
  "angular-ts": "ts",
  "glimmer-js": "js",
  "glimmer-ts": "ts",
  
  // Styling and templating
  scss: "scss",
  sass: "sass",
  less: "less",
  stylus: "styl",
  postcss: "pcss",
  handlebars: "hbs",
  hbs: "hbs",
  pug: "pug",
  jade: "jade",
  haml: "haml",
  liquid: "liquid",
  twig: "twig",
  erb: "erb",
  blade: "blade.php",
  razor: "cshtml",
  edge: "edge",
  templ: "templ",
  
  // Configuration and data
  json: "json",
  jsonc: "jsonc",
  json5: "json5",
  yaml: "yaml",
  yml: "yml",
  toml: "toml",
  ini: "ini",
  dotenv: "env",
  
  // Build tools and configs
  dockerfile: "dockerfile",
  docker: "dockerfile",
  makefile: "mak",
  make: "mak",
  cmake: "cmake",
  nginx: "conf",
  apache: "conf",
  "git-commit": "gitcommit",
  "git-rebase": "gitrebase",
  codeowners: "CODEOWNERS",
  
  // Documentation
  markdown: "md",
  md: "md",
  mdx: "mdx",
  asciidoc: "adoc",
  adoc: "adoc",
  rst: "rst",
  
  // Shell and scripting
  bash: "sh",
  sh: "sh",
  shell: "sh",
  shellscript: "sh",
  powershell: "ps1",
  ps1: "ps1",
  fish: "fish",
  zsh: "zsh",
  
  // Database
  sql: "sql",
  graphql: "graphql",
  gql: "gql",
  prisma: "prisma",
  
  // Other useful web languages
  xml: "xml",
  xsl: "xsl",
  regex: "regex",
  regexp: "regexp",
  diff: "diff",
  log: "log",
  csv: "csv",
  tsv: "tsv",
  
  // HTTP and APIs
  http: "http",
  
  // Mermaid diagrams
  mermaid: "mmd",
  mmd: "mmd",
};

export const CodeBlockDownloadButton = ({
  onDownload,
  onError,
  language,
  children,
  className,
  code: propCode,
  ...props
}: CodeBlockDownloadButtonProps & {
  code?: string;
  language?: WebLanguage;
}) => {
  const contextCode = useContext(CodeBlockContext).code;
  const code = propCode ?? contextCode;
  const extension =
    language && language in languageExtensionMap
      ? languageExtensionMap[language]
      : "txt";
  const filename = `file.${extension}`;
  const mimeType = "text/plain";

  const downloadCode = () => {
    try {
      save(filename, code, mimeType);
      onDownload?.();
    } catch (error) {
      onError?.(error as Error);
    }
  };

  return (
    <button
      className={cn(
        "cursor-pointer p-1 text-muted-foreground transition-all hover:text-foreground",
        className
      )}
      onClick={downloadCode}
      title="Download file"
      type="button"
      {...props}
    >
      {children ?? <DownloadIcon size={14} />}
    </button>
  );
};

export const CodeBlockCopyButton = ({
  onCopy,
  onError,
  timeout = 2000,
  children,
  className,
  code: propCode,
  ...props
}: CodeBlockCopyButtonProps & { code?: string }) => {
  const [isCopied, setIsCopied] = useState(false);
  const timeoutRef = useRef(0);
  const contextCode = useContext(CodeBlockContext).code;
  const code = propCode ?? contextCode;

  const copyToClipboard = async () => {
    if (typeof window === "undefined" || !navigator?.clipboard?.writeText) {
      onError?.(new Error("Clipboard API not available"));
      return;
    }

    try {
      if (!isCopied) {
        await navigator.clipboard.writeText(code);
        setIsCopied(true);
        onCopy?.();
        timeoutRef.current = window.setTimeout(
          () => setIsCopied(false),
          timeout
        );
      }
    } catch (error) {
      onError?.(error as Error);
    }
  };

  useEffect(() => {
    return () => {
      window.clearTimeout(timeoutRef.current);
    };
  }, []);

  const Icon = isCopied ? CheckIcon : CopyIcon;

  return (
    <button
      className={cn(
        "cursor-pointer p-1 text-muted-foreground transition-all hover:text-foreground",
        className
      )}
      onClick={copyToClipboard}
      type="button"
      {...props}
    >
      {children ?? <Icon size={14} />}
    </button>
  );
};
