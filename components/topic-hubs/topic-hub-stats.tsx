import type { HubStats } from "@/lib/topic-hubs/hub-types";

type TopicHubStatsProps = {
  stats: HubStats;
};

export function TopicHubStats({ stats }: TopicHubStatsProps) {
  return (
    <section
      aria-labelledby="topic-hub-stats-heading"
      className="border-t border-white/5 bg-white/[0.02] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-6">
        <h2
          id="topic-hub-stats-heading"
          className="text-center text-2xl font-bold tracking-tight sm:text-3xl"
        >
          Hub statistics
        </h2>
        <dl className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center">
            <dt className="text-sm text-slate-500">Live pages</dt>
            <dd className="mt-2 text-3xl font-bold text-white">{stats.liveCount}</dd>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center">
            <dt className="text-sm text-slate-500">Planned pages</dt>
            <dd className="mt-2 text-3xl font-bold text-white">
              {stats.plannedCount}
            </dd>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center">
            <dt className="text-sm text-slate-500">Total pages</dt>
            <dd className="mt-2 text-3xl font-bold text-white">{stats.totalCount}</dd>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center">
            <dt className="text-sm text-slate-500">Average priority</dt>
            <dd className="mt-2 text-3xl font-bold text-white">
              {stats.averagePriority}
            </dd>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center sm:col-span-2 lg:col-span-1">
            <dt className="text-sm text-slate-500">Highest priority page</dt>
            <dd className="mt-2 text-base font-semibold text-white">
              {stats.highestPriorityPage?.title ?? "—"}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
