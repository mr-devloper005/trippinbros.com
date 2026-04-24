import Link from "next/link";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { Footer } from "@/components/shared/footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Layers, TrendingUp } from "lucide-react";
import { fetchSiteFeed } from "@/lib/site-connector";
import { buildPostUrl, getPostTaskKey } from "@/lib/task-data";
import { getMockPostsForTask } from "@/lib/mock-posts";
import { SITE_CONFIG } from "@/lib/site-config";
import { TaskPostCard } from "@/components/shared/task-post-card";

export const revalidate = 3;

const matchText = (value: string, query: string) =>
  value.toLowerCase().includes(query);

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, " ");

const compactText = (value: unknown) => {
  if (typeof value !== "string") return "";
  return stripHtml(value).replace(/\s+/g, " ").trim().toLowerCase();
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }>;
}) {
  const resolved = (await searchParams) || {};
  const query = (resolved.q || "").trim();
  const normalized = query.toLowerCase();
  const category = (resolved.category || "").trim().toLowerCase();
  const task = (resolved.task || "").trim().toLowerCase();
  const useMaster = resolved.master !== "0";
  const feed = await fetchSiteFeed(
    useMaster ? 1000 : 300,
    useMaster
      ? { fresh: true, category: category || undefined, task: task || undefined }
      : undefined
  );
  const posts =
    feed?.posts?.length
      ? feed.posts
      : useMaster
        ? []
        : SITE_CONFIG.tasks.flatMap((taskItem) => getMockPostsForTask(taskItem.key));

  const filtered = posts.filter((post) => {
    const content = post.content && typeof post.content === "object" ? post.content : {};
    const typeText = compactText((content as any).type);
    if (typeText === "comment") return false;
    const description = compactText((content as any).description);
    const body = compactText((content as any).body);
    const excerpt = compactText((content as any).excerpt);
    const categoryText = compactText((content as any).category);
    const tags = Array.isArray(post.tags) ? post.tags.join(" ") : "";
    const tagsText = compactText(tags);
    const derivedCategory = categoryText || tagsText;
    if (category && !derivedCategory.includes(category)) return false;
    if (task && typeText && typeText !== task) return false;
    if (!normalized.length) return true;
    return (
      matchText(compactText(post.title || ""), normalized) ||
      matchText(compactText(post.summary || ""), normalized) ||
      matchText(description, normalized) ||
      matchText(body, normalized) ||
      matchText(excerpt, normalized) ||
      matchText(tagsText, normalized)
    );
  });

  const results = normalized.length > 0 ? filtered : filtered.slice(0, 24);

  const availableCategories = Array.from(
    new Set(
      posts
        .map((post) =>
          compactText(
            post.content && typeof post.content === "object"
              ? (post.content as any).category
              : ""
          )
        )
        .filter((value) => value.length > 0)
    )
  ).slice(0, 10);

  const availableTasks = Array.from(
    new Set(
      posts
        .map((post) =>
          compactText(
            post.content && typeof post.content === "object"
              ? (post.content as any).type
              : ""
          )
        )
        .filter((value) => value.length > 0 && value !== "comment")
    )
  );

  return (
    <div className="min-h-screen bg-[#ededed] text-[#292929]">
      <NavbarShell />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <section className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <article className="border border-[#dbdbdb] bg-white p-6">
            <span className="inline-flex items-center gap-2 bg-[#2d2d30] px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
              <Search className="h-3.5 w-3.5" /> Search
            </span>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight text-[#1f1f1f]">
              {query ? `Results for "${query}"` : "Discover bookmarks and resources faster"}
            </h1>
            <p className="mt-4 text-base leading-8 text-[#444]">
              Search across curated content, refine by category or type, and quickly open the best matching resources.
            </p>
            <form action="/search" className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]">
              <input type="hidden" name="master" value="1" />
              {category ? <input type="hidden" name="category" value={category} /> : null}
              {task ? <input type="hidden" name="task" value={task} /> : null}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#868686]" />
                <Input
                  name="q"
                  defaultValue={query}
                  placeholder="Search bookmarks, tags, and summaries..."
                  className="h-11 rounded-none border-[#d1d1d1] bg-white pl-9 text-[#2c2c2c]"
                />
              </div>
              <Button type="submit" className="h-11 rounded-none bg-[#f5bc08] px-6 text-sm font-bold uppercase text-white hover:bg-[#dca703]">
                Search
              </Button>
            </form>
          </article>

          <aside className="space-y-5">
            <div className="border border-[#dbdbdb] bg-white p-5">
              <h2 className="border-b border-[#ececec] pb-2 text-3xl font-extrabold text-[#1f1f1f]">Search Stats</h2>
              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="border border-[#ececec] p-3">
                  <p className="text-xs font-bold uppercase text-[#7b7b7b]">Results</p>
                  <p className="mt-1 text-2xl font-extrabold text-[#1f1f1f]">{results.length}</p>
                </div>
                <div className="border border-[#ececec] p-3">
                  <p className="text-xs font-bold uppercase text-[#7b7b7b]">Categories</p>
                  <p className="mt-1 text-2xl font-extrabold text-[#1f1f1f]">{availableCategories.length}</p>
                </div>
                <div className="border border-[#ececec] p-3">
                  <p className="text-xs font-bold uppercase text-[#7b7b7b]">Types</p>
                  <p className="mt-1 text-2xl font-extrabold text-[#1f1f1f]">{availableTasks.length}</p>
                </div>
              </div>
            </div>

            <div className="border border-[#dbdbdb] bg-white p-5">
              <h2 className="border-b border-[#ececec] pb-2 text-3xl font-extrabold text-[#1f1f1f]">Quick Filters</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  href="/search?master=1"
                  className={`inline-flex items-center gap-1 rounded-none border px-3 py-1.5 text-sm font-semibold ${
                    !category ? "border-[#2f2f32] bg-[#2f2f32] text-white" : "border-[#d3d3d3] text-[#4f4f4f]"
                  }`}
                >
                  <Filter className="h-3.5 w-3.5" /> all
                </Link>
                {availableCategories.map((item) => (
                  <Link
                    key={item}
                    href={`/search?master=1&category=${encodeURIComponent(item)}${query ? `&q=${encodeURIComponent(query)}` : ""}${task ? `&task=${encodeURIComponent(task)}` : ""}`}
                    className={`inline-flex rounded-none border px-3 py-1.5 text-sm font-semibold ${
                      category === item ? "border-[#2f2f32] bg-[#2f2f32] text-white" : "border-[#d3d3d3] text-[#4f4f4f]"
                    }`}
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </section>

        {results.length ? (
          <section className="mt-8">
            <div className="mb-4 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-wide text-[#777]">
              <span className="inline-flex items-center gap-1">
                <TrendingUp className="h-3.5 w-3.5" /> search results
              </span>
              {task ? (
                <span className="inline-flex items-center gap-1">
                  <Layers className="h-3.5 w-3.5" /> task: {task}
                </span>
              ) : null}
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((post) => {
                const taskKey = getPostTaskKey(post);
                const href = taskKey ? buildPostUrl(taskKey, post.slug) : `/posts/${post.slug}`;
                return <TaskPostCard key={post.id} post={post} href={href} />;
              })}
            </div>
          </section>
        ) : (
          <div className="mt-8 border border-dashed border-[#cfcfcf] bg-white p-10 text-center text-[#666]">
            No matching posts yet.
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
