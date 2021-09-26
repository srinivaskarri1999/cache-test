import LD from "./LD"
import Table from "./table"

import i1 from "./images/1.png"
import i2 from "./images/2.png"
import i3 from "./images/3.jpeg"
import i4 from "./images/4.jpeg"
import i5 from "./images/5.jpeg"
import i6 from "./images/6.jpeg"
import i7 from "./images/7.jpeg"
import i8 from "./images/8.jpeg"
import i9 from "./images/9.jpeg"
import i10 from "./images/10.jpeg"
import i11 from "./images/11.jpeg"
import i12 from "./images/12.jpeg"
import i13 from "./images/13.png"
import i14 from "./images/14.png"
import i15 from "./images/15.png"
import i16 from "./images/16.png"
import i17 from "./images/17.png"
import i18 from "./images/18.png"
import i19 from "./images/19.png"
import i20 from "./images/20.png"
import i21 from "./images/21.png"
import i22 from "./images/22.png"
import i23 from "./images/23.png"
import i24 from "./images/24.png"
import i25 from "./images/25.png"
import i26 from "./images/26.png"
import i27 from "./images/27.png"
import i28 from "./images/28.png"
import i29 from "./images/29.png"
import i30 from "./images/30.png"
import i31 from "./images/31.png"
import i32 from "./images/32.png"
import i33 from "./images/33.png"
import i34 from "./images/34.png"
import i35 from "./images/35.png"
import i36 from "./images/36.png"

const t1 = [
  ["Are a layer over message Queues <-- Unidirectional!", "UNIDIRECTIONAL"],
  [
    "Have a maximum number of elements and each element has maximum size",
    "Fixed number of entries, Each entry has a maximum size",
  ],
  [
    "is NOT A STREAMING INTERFACE. Datagram semantics, just list message Queues",
    "All the queue memory (# entries * entry size) allocated at creation",
  ],
  [
    "On read, WILL PEND until there is data to read",
    "Datagram-like behavior: reading an entry removes it from the queue. If you don't read the entire data, the rest is lost. For example: send a 20 byte message, but the receiver reads 10 bytes. The remaining 10 bytes are lost.",
  ],
  [
    "On write, WILL PEND until there is space in the underlying message queue",
    "Task can only pend on a single queue using msqQReceive (there are ways to change that with alternative API)",
  ],
  [
    "Can use select facility to wait on multiple pipes",
    "When sending, you will pend if the queue is full (and you don't do NO_WAIT) When receiving, you will pend if the queue is empty (and you don't do NO_WAIT) Timeouts are supported on receive and send",
  ],
]

const co1 = [
  {
    question: (
      <>
        Disk blocks allocated to a file are added to the free list when the file
        is deleted. Write an algorithm to perform this operation in Unix. Scheme
        of Evaluation:
      </>
    ),
    answer: (
      <>
        <img src={i1} alt='img1' /> <br />
        Figure 4.20. Freeing Disk Blocks
      </>
    ),
  },
  {
    question: (
      <>
        xv6's mkfs program generate layout for an empty file system. Illustrate
        xv6 on-disk layout where Block 0, 1, 2 are fixed. Explain the purpose
        and goal of Logging (Transactions).
      </>
    ),
    answer: (
      <>
        <strong>xv6 layout of File System</strong> <br />
        <img src={i2} alt='img2' /> <br />
        Structure of the xv6 file system. The header fs.h contains constants and
        data structures describing the exact layout of the file system. <br />
        Notice: Block 0, 1, 2 are fixed
        <br />
        <strong>Block 0:</strong> Boot code
        <br />
        <strong>Block 1:</strong> Super Block. Store metadata about the file
        system <br />
        <LD
          options={[
            "Size (# of the blocks)",
            "# of data blocks",
            "# of inodes",
            "# of blocks in log",
            "Besides, super block also fills in by a small program called mkfs (mkfs.c) which is an initial file system",
          ]}
        />
        <strong>Block 2:</strong> Log area. Use for transactions. Maintain
        consistency in case of a power outrage or system shutdown accidentally.
        Logging (Transactions)
        <br />
        <strong>Purpose:</strong> Do transactions to achieve crash recovery.
        Transactions mean group multiple writes into one bundle <br />
        <strong>Goal:</strong> For Consistency
      </>
    ),
  },
  {
    question: (
      <>
        <LD
          type='ol'
          options={[
            "What is the buffer header and during system initialization why kernel allocates space for a number of buffers. Suppose the kernel does a delayed write of a block. What happens when another process takes that block from its hash queue? From the free list?",
            "Write a system program that list files names and inode numbers in a given directory, like when you execute the following command: $ ls – ia",
          ]}
        />
      </>
    ),
    answer: (
      <>
        Scheme of Evaluation: <br />
        Buffer Header - 2 <br />
        Delayed write of a block and race condition - 2 M <br />
        A system program - Uses readdir to populate a dirent structure - 4 M
        <br />
        <img src={i3} alt='img3' />
        <br />
        <img src={i4} alt='img4' />
        <br />
        <code>
          {
            '\
          #include <dirent.h>\
          #include <stdio.h>\
          #include "quit.h"\
          int main(int argc, char **argv) {\
          DIR dir;\
          struct dirent *direntry;\
          arg_check(2, argc, "Specify a directory\n", 1) ;\
          if ( (dir = opendir(argv[1])) == NULL)\
          { perror("opendir");\
          exit(1);}\
          while ((direntry = readdir(dir)) != NULL)\
          printf(“%10d %s\n”, direntry->d_ino, direntry-\
          >d_name);\
          closedir(dir);\
          exit(0);\
          }'
          }
        </code>
      </>
    ),
  },
  {
    question: (
      <>
        <LD
          type='ol'
          options={[
            "When can a file be deleted from disk? how does xv6 delete a file? List xv6 kernel code functions/algorithms and files directly or indirectly used for command $ rm a",
            "How read system calls work. Explain algorithm. What are its input parameters and returns information. Describe xv6 functions: filealloc, filedup, and fileclose.",
          ]}
        />
      </>
    ),
    answer: (
      <>
        When can a file be deleted from disk? – 2M An inode has two counts
        associated with it: nlink says how many links point to this file in the
        directory tree. The count ref that is stored only in the memory version
        of the inode counts how many C pointers exist to the in-memory inode. A
        file can be deleted from disk only when both these counts reach zero.
        List xv6 kernel code functions/algorithms for $ rm a – 2M writei iupdate
        bzero (sys_unlink, iunlockput, iput, itrunc, bfree, bzero) bfree iupdate
        (length; itrunc) iupdate (type=free; iput) read system call steps – 2M
        ssize_t read(int fildes, void *buf, size_t nbyte); Describe filealloc,
        filedup, and fileclose.- 2M The functions filealloc, filedup, and
        fileclose manipulate the global filetable. When an open file is being
        closed, and its reference count is zero, then the in-memory reference to
        the inode is also released via iput. Note how the global file table lock
        is released before calling iput, in order not to hold the lock and
        perform disk operations.
      </>
    ),
  },
  {
    question: (
      <>
        In xv6, Explain the working of open("a/b/c", O_RDWR). List xv6 kernel
        code functions/algorithms used
      </>
    ),
    answer: (
      <>
        xv6 functions – 6M
        <br />
        <LD
          options={[
            "sys_open",
            <>
              namei should return inode for "a/b/c"
              <LD
                options={[
                  "namei",
                  "namex",
                  "start in cp->cwd",
                  "skipelem: a/b/c -> b/c, name=a",
                  'look up "a": dirlookup iterates over all entries in dir',
                  'go back around looking up "b/c" in the "a" dir',
                  'look up "b", ...',
                  'return inode for "a/b/c"',
                ]}
              />
            </>,
            "back in sys_open, get a new FD#",
            "this is where we save reference to actual inode",
            "return FD# to user",
          ]}
        />
      </>
    ),
  },
  {
    question: (
      <>
        Explain about structure of a regular file and bmap algorithm in detail.
        Given a disk-block size of 1 KB and block-pointer address value of 8
        bytes, what is the largest file size (in bytes) that can be accessed
        using 10 direct addresses and one indirect block?
      </>
    ),
    answer: (
      <>
        bmap algorithm - 3 M<br />
        <img src={i5} alt='img5' /> <br />
        <img src={i6} alt='img6' /> <br />
        10 direct blocks. One indirect block, which holds 128 blocks. So, the
        largest file size will be 138blocks which is 138 KB - 3. 5 M <br />
      </>
    ),
  },
  {
    question: (
      <>
        Suppose a process wants to write a few bytes. Let’s assume we want to
        write 100 bytes, starting with byte 2000 in the file. This will be
        expressed by the pair of system calls: seek(fd,2000); write(fd,buf,100);
        Let’s also assume that each disk block is 1024 bytes. Illustrate how
        Writing may require new blocks to be allocated according to its internal
        structure, algorithms, and data structures.
      </>
    ),
    answer: (
      <>
        The data we want to write spans the end of the second block to the
        beginning of the third block. The problem is that disk accesses are done
        in fixed blocks, and we only want to write part of such a block.
        Therefore, the full block must first be read into the buffer cache. Then
        the part being written is modified by overwriting it with the new data.
        In our example, this is done with the second block of the file, which
        happens to be block 8 on the disk. The rest of the data should go into
        the third block, but the file currently only has two blocks. Therefore,
        a third block must be allocated from the pool of free blocks. Let’s
        assume that block number 2 on the disk was free, and that this block was
        allocated. 3M As this is a new block, there is no need to read it from
        the disk before modifying it - we just allocate a block in the buffer
        cache, prescribe that it now represents block number 2, and copy the
        requested data to it. Finally, the modified blocks are written back to
        the disk. Note that the copy of the file’s inode was also modified, to
        reflect the allocation of a new block. Therefore, this too must be
        copied back to the disk. Likewise, the data structure used to keep track
        of free blocks needs to be updated on the disk as well. 3.5M
      </>
    ),
  },
  {
    question: (
      <>
        Explain Inode Life Cycle with ialloc(), iput() algorithms. Typical
        accessing inode example in Xv6 source code. ip = iget(dev, inum);
        ilock(ip); / *... examine and modify ip-{">"}xxx ... * / iunlock(ip);
        iput(ip);
      </>
    ),
    answer: (
      <>
        Explain Inode Life Cycle with ialloc(), iput() algorithms. <br />
        Typical accessing inode example in Xv6 source code. <br />
        ip = iget(dev, inum);
        <br />
        ilock(ip); iunlock(ip);
        <br />
        iput(ip); ialloc();
        <br />
        algorithm explanation- 3 M iput() <br />
        algorithm explanation - 3 M Maurice J. Bach, The Design of The Unix
        Operating System, 2013 PHI Publishing, section: 4.1.2, 4.6 Figure 4.4.
        Releasing an mode Figure 4.12. Algorithm for Assigning New Modes
      </>
    ),
  },
  {
    question: (
      <>
        An OS supports a system call sleep, which puts the program making the
        call to sleep for the number of seconds indicated in the argument of the
        sleep call. Explain how this system call is implemented.
      </>
    ),
    answer: (
      <>
        xv6's implementation of sleep
        <code>
          {
            "void sleep(void *chan, struct lock *lk):\
          if (lk != &ptable.lock) {\
            acquire(&ptable.lock);\
            release(lk);\
            curproc->chan = chan\
            curproc->state = SLEEPING\
            sched()\
          }"
          }
        </code>
      </>
    ),
  },
  {
    question: (
      <>Explain the xv6 code for mycpu and myproc. mycpu – 2M myproc – 2.5 M</>
    ),
    answer: (
      <>
        xv6 maintains a struct cpu for each processor, which records the process
        currently running on the processor (if any), the processor’s unique
        hardware identifier (apicid), and some other information. The function
        mycpu returns the current processor’s struct cpu. mycpu does this by
        reading the processor identifier from the local APIC hardware and
        looking through the array of struct cpu for an entry with that
        identifier. The return value of mycpu is fragile: if the timer were to
        interrupt and cause the thread to be moved to a different processor, the
        return value would no longer be correct. To avoid this problem, xv6
        requires that callers of mycpu disable interrupts, and only enable them
        after they finish using the returned struct cpu. The function myproc
        returns the struct proc pointer for the process that is running on the
        current processor. myproc disables interrupts, invokes mycpu, fetches
        the current process pointer (c-{">"}proc) out of the struct cpu, and
        then enables interrupts. If there is no process running, because the the
        caller is executing in scheduler, myproc returns zero. The return value
        of myproc is safe to use even if interrupts are enabled: if a timer
        interrupt moves the calling process to a different processor, its struct
        proc pointer will stay the same.
      </>
    ),
  },
  {
    question: (
      <>
        <LD
          type='ol'
          options={[
            "How many levels does the UNIX scheduling algorithm include? What are they? In its low-level algorithm, how is the priority value for every process computed? What does each of the three components in the priority formula mean, respectively? How does the priority formula indicate that UNIX gives higher priority to processes that have used less CPU time in the recent past? Explain the reason by describing the computation process of the priority formula.",
            "Write a system program to execute a command and redirect the output to a file : $ wc sample.txt > newfile.",
          ]}
        />
      </>
    ),
    answer: (
      <>
        (i) There are two levels of unix scheduling algorithm. They are user
        level and kernel level. Processes that sleep in lower-level algorithms
        tends to cause more system bottlenecks the longer they are inactive;
        hence they receive a higher priority than processes that would cause
        fewer system bottlenecks. priority--- ("recent CPU usage"/2) + (base
        level user priority) In this formula, "base level user priority" is the
        threshold priority between kernel and user mode. When it recomputes
        recent CPU usage, the clock handler also recalculates the priority of
        every process in the "preempted but ready-to-run" state according to the
        above formula. A numerically low value implies a high scheduling
        priority. Examining the functions for recomputation of recent CPU usage
        and process priority, the slower the decay rate for recent CPU usage,
        the longer it will take for the priority of a process to reach its base
        level; consequently, processes in the "ready-to-run" state will tend to
        occupy more priority levels. Kernel assigns priority to a process about
        to go to sleep, correlating a fixed, priority value with the reason for
        sleeping. The priority does not depend on the runtime characteristics of
        the process (I/O bound or CPU bound), but instead is a constant value
        that is hard-coded for each call to sleep, dependent on the reason the
        process is sleeping. Processes can exercise crude control of their
        scheduling priority by using the nice system call: nice (value); where
        value is added in the calculation of process priority: priority=
        ("recent CPU usage"/constant) + (base priority) + (nice value) Maurice
        J. Bach, The Design of The Unix Operating System, 2013 PHI Publi <br />
        (ii)
        <code>
          {
            '#include <unistd.h>\
            #include <stdio.h>\
            #include <sys/stat.h>\
            #include <fcntl.h>\
            #include <wait.h>\
            #define OPENFLAGS (O_WRONLY | O_CREAT | O_TRUNC)\
            #define MODE6OO (S_IRUSR | S_IWUSR)\
            int main(int argc, char **argv) {\
            int fd2, rv, exit_status;\
            if (fork() == 0) {\
            perror("Error in opening file for reading\n");\
            exit(1); }\
            if ((fd2 = open(argv[1], OPENFLAGS, MODE6OO)) == -1){\
            perror("Error in opening file for writing\n");\
            exit(2); }\
            dup2(fd2,1);\
            execvp(argv[2], &argv[2]);\
            perror("exec error");\
            exit(3);\
            } else { \
            wait(&rv);\
            printf("Exit status: %d\n", WEXITSTATUS(rv));\
            }\
            }'
          }
        </code>
      </>
    ),
  },
  {
    question: (
      <>
        <LD
          type='ol'
          options={[
            "In xv6, explain the purpose of init.c. How shell works give an algorithm?",
            "Explain algorithms for stime, time, times, and clock",
          ]}
        />
      </>
    ),
    answer: (
      <>
        (i){" "}
        <LD
          type='ol'
          options={[
            "The PPID of every login shell is always 1. This is the init process: the second process of the system.",
            "init is a very important process and, apart from being the parent of users’ shells, it is also responsible for giving birth to every service that’s running in the system—like printing, mail, Web, and so on.",
            "Even though no one may be using the system, a number of system processes keep running all the time.",
            "They are spawned during system startup by init (PID 1), the parent of the login shell. The ps -e command lists them all.",
            "System processes that have no controlling terminal are easily identified by the ? in the TTY column.",
            "A process that is disassociated from the terminal can neither write to the terminal nor read from it. Such processes are also known as daemons. Many of these daemons are actually sleeping (a process state) and wake up only when they receive input.",
            "Examples of Daemons are: lpsched, sendmail, inetd etc.",
            'To initialize a system from an inactive state, an administrator goes through a "bootstrap" sequence: The administrator "boots" the system. Boot procedures vary according to machine type, but the goal is common to all machines.',
            "The init process is a process dispatcher, spawning processes that allow users to log in to the system, among others.",
            'Init reads the file "tetchnittab" for instructions about which processes to spawn.',
            'The file "/etc/inittab" contains lines that contain an "id," a state identifier (single user, multi-user, etc.), an "action" and a program specification.',
            "Init reads the file and, if the state in which it was invoke",
          ]}
        />
        <br />
        (ii)
        <img src={i7} alt='img7' />
        <br />
      </>
    ),
  },
  {
    question: (
      <>
        List the various sections of the disk image of an executable file in
        UNIX. In xv6, explain the algorithm for a system call that makes a
        process to overwrite itself with another executable image.
      </>
    ),
    answer: (
      <>
        (i) UNIX supports many executable file formats. The oldest is the a.out
        format, which has a 32-byte header followed by text and data sections
        and the symbol table. The program header contains the sizes of the text,
        initialized data, and uninitialized data regions, and the entry point,
        which is the address of the first instruction the program must execute.
        It also contains a magic number, which identifies the file as a valid
        executable file and gives further information about its format, such as
        whether the file is demand paged, or whether the data section begins on
        a page boundary. Each UNIX variant defines the set of magic numbers it
        supports. <br />
        (ii) Exec system call that makes a process to overwrite itself with
        another executable image. <br />
        The exec system call must perform the following tasks: <br />
        <LD
          type='ol'
          options={[
            "Parse the pathname and access the executable file.",
            "Verify that the caller has execute permission for the file.",
            "Read the header and check that it is a valid executable.",
            "f the file has SUID or SGID bits set in its mode, change the caller's effective UID or GID respectively to that of the owner of the file.",
            "Copy the arguments to exec and the environment variables into kernel space, since the current user space is going to be destroyed.",
            "Allocate swap space for the data and stack regions.",
            "Free the old address space and the associated swap space. If the process was created by vfork, return the old address space to the parent instead.",
            "Allocate address maps for the new text, data, and stack.",
            "Set up the new address space. If the text region is already active (some other process is already running the same program}, share it with this process. Otherwise, it must be initialized from the executable file. UNIX processes are usually demand paged, meaning that each page is read into memory only when the program needs it.",
            "Copy the arguments and environment variables back onto the new user stack.",
            "Reset all signal handlers to default actions, because the handler functions do not exist in the new program. Signals that were ignored or blocked before calling exec remain ignored or blocked.",
            "Initialize the hardware context. Most registers are reset to zero, and the program counter is set to the entry point of the program.",
          ]}
        />
      </>
    ),
  },
  {
    question: (
      <>
        The traditional UNIX scheduler is a priority-based round robin scheduler
        (also called a multi-level round robin scheduler). How does the
        scheduler go about favoring I/O bound jobs over long-running CPU-bound
        jobs? For the given list of processes and service time: P1 120, P2 60,
        P3 180, p4 50, P5 300 Answer the following:
        <br />
        <LD
          type='ol'
          options={[
            "Draw a Gantt chart that shows the completion times for each process using first-come, first served CPU scheduling.",
            "Draw a Gantt chart that shows the completion times for each process using shortest-job-next CPU scheduling.",
            "Draw a Gantt chart that shows the completion times for each process using round-robin CPU scheduling with a time slice of 60.",
          ]}
        />
      </>
    ),
    answer: (
      <>
        <img src={i8} alt='img8' /> <br />
        <img src={i9} alt='img9' /> <br />
        <img src={i10} alt='img10' /> <br />
      </>
    ),
  },
  {
    question: (
      <>
        Show a pictorial arrangement - Sharing of kernel data structures and
        open files between parent and child after fork. What elements of the
        process context must the kernel explicitly save when handling
        (i).context switch, (ii) an interrupt, or (iii) a system call? What are
        the similarities and differences?
      </>
    ),
    answer: (
      <>
        The logical view of the parent and child processes and their
        relationship to other kernel data structures immediately after
        completion of the fork system call. To summarize, both processes share
        files that the parent had open at the time of the fork, and the file
        table reference count for those files is one greater than it had been.
        Similarly, the child process has the same current directory and changed
        root (if applicable) as the parent, and the mode reference count of
        those directories is one greater than it had been. The processes have
        identical copies of the text, data, and (user) stack regions; the region
        type and the system implementation determine whether the processes can
        share a physical copy of the text region.
        <br />
        <img src={i11} alt='img11' />
        <br />
        The context of a process consists of the contents of its (user) address
        space and the contents of hardware registers and kernel data structures
        that relate to the process. Formally, the context of a process is the
        union of its user-level context, register context, and system-level
        context! The user-level context consists of the process text, data, user
        stack, and shared memory that occupy the virtual address space of the
        process. Maurice J. Bach, The Design of The Unix Operating System, 2013
        PHI Publishing, section: 6.3 Figure 6.8. Components of the Context of a
        Process There are 4 situations under which kernel permits a context
        switch are :
        <LD
          options={[
            "When a process is in sleep mode",
            "When a process goes to exit",
            "When a process returns from a system call to user mode but is not the most eligible process to run",
            "When a process returns from an interrupt handler to user mode but is not the most eligible process to run",
          ]}
        />
        A running process will always result in a context switch of the running
        process, even in a non preemptive kernel design when
        <br /> <br /> a) A blocking system call. <br />
        {"b)"} The system call exit, to terminate the current process <br />{" "}
        After finishing its job in kernel mode, the OS may sometimes decide to
        go back to the user mode of the same process, without switching to
        another process. Sequence of events happen during a context switch from
        (user mode of) process P to (user mode of) process Q, triggered by a
        timer interrupt that occurred when P was executing, in a Unix-like
        operating system design
        <LD
          type='ol'
          options={[
            "The CPU executing process P moves from user mode to kernel mode.",
            "The OS scheduler code is invoked.",
            "The CPU stack pointer moves from the kernel stack of P to the kernel stack of Q.",
            "The CPU program counter moves from the kernel address space of P to the kernel address space of Q.",
            "The CPU program counter moves from the kernel address space of Q to the user address space of Q.",
          ]}
        />
      </>
    ),
  },
  {
    question: (
      <>
        What do we mean by race condition in the context of multiple processes?
        Explain race for locked Buffer and free Buffer with a diagram. Give
        solution using locks. Illustrate xv6 spinlocks.
      </>
    ),
    answer: (
      <>
        A race condition occurs when two or more processes can access shared
        data and they try to change it at the same time
        <br />
        <img src={i12} alt='img12' /> <br />
        Give solution using locks. Illustrate xv6 spinlocks. 2 M xv6 runs on a
        multiprocessor and allows multiple CPUs to execute concurrently inside
        the kernel. These usually correspond to system calls made by processes
        running on different CPUs. There might also be interrupt handlers
        running at the same time as other kernel code. An interrupt can occur on
        any of the CPUs; both user-level processes and processes inside the
        kernel can be interrupted. xv6 uses spin-locks to coordinate how these
        concurrent activities share data structures. <br /> Spinning vs blocking
        Spin-locks are good when protecting short operations: increment a
        counter, search in i-node cache, allocate a free buffer. In these cases
        acquire() won't waste much CPU time spinning even if another CPU holds
        the lock.
        <br /> Spin locks are not so great for code that has to wait for events
        that might take a long time. For example, it would not be good for the
        disk reading code to get a spin-lock on the disk hardware, start a read,
        wait for the disk to finish reading the data, and then release the lock.
        The disk often takes 10s of milliseconds (millions of instructions) to
        complete an operation. Spinning wastes the CPU; if another process is
        waiting to execute, it would be better to run that process until the
        disk signals it is finished by causing an interrupt.
        <br />
        xv6 has sleep() and wakeup() primitives that are better for processes
        that need to wait for I/O.
      </>
    ),
  },
]

const co2 = [
  {
    question: (
      <>
        Illustrate hardware-based dynamic relocation, Hardware Requirements and
        Operating System Responsibilities
      </>
    ),
    answer: (
      <>
        Transforming a virtual address into a physical address is referred as
        address translation; that is, the hardware takes a virtual address and
        transforms it into a physical address which is where the data actually
        resides. Because this relocation of the address happens at runtime, and
        because we can move address spaces even after the process has started
        running, the technique is often referred to as dynamic relocation.
        <br /> <br />
        To implement Dynamic (Hardware-based) Relocation, we’ll need two
        hardware registers within each CPU: one is called the base register, and
        the other the bounds (sometimes called a limit register).The base and
        bounds registers are kept on the chip (one pair per CPU) which is called
        as memory management unit (MMU).
        <br /> <br />
        <strong>physical address = virtual address + base</strong>
        <img src={i13} alt='img13' width={350} /> <br />
        Each memory reference generated by the process is a virtual address; the
        hardware in turn adds the contents of the base register to this address
        and the result is a physical address that can be issued to the memory
        system <br />
        <strong>Dynamic Relocation: Hardware Requirements</strong>
        <br />
        <img src={i14} alt='img14' width={450} /> <br />
        <strong>Dynamic Relocation: Operating System Responsibilities</strong>
        <br />
        <img src={i15} alt='img15' width={450} /> <br />
      </>
    ),
  },
  {
    question: (
      <>
        Please give your version of the realloc() call using system calls to
        allocate the swap space for the process to be swapped out You can
        descript it with a C-like algorithm
      </>
    ),
    answer: (
      <>
        The realloc() function changes the size of the memory block pointed to
        by ptr to size bytes. The contents will be unchanged in the range from
        the start of the region up to the minimum of the old and new sizes. If
        the new size is larger than the old size, the added memory will not be
        initialized. If ptr is NULL, then the call is equivalent to
        malloc(size), for all values of size; if size is equal to zero, and ptr
        is not NULL, then the call is equivalent to free(ptr). Unless ptr is
        NULL, it must have been returned by an earlier call to malloc(),
        calloc() or realloc(). If the area pointed to was moved, a free(ptr) is
        done. <br /> <br />
        When swapper wakes up to swap processes in, it selects the processes
        which has spent the longest time in the state "ready to run but swapped
        out". The algorithm swapper is given below:
        <br />
        <code>
          {`/* Algorithm: swapper
            * Input: none
            * Output: none
            */
            {
            loop:
            for (all swapped out processes that are ready to run)
            pick process swapped out longest;
            if (no such process)
            {
            sleep (event: must swap in);
            goto loop;
            }
            if (enough room in main memory for process) 2.5M
            {
            swap process in;
            goto loop;
            }
            // loop2: here in revised algorithm given later
            for (all processes loaded in main memory, not zombie and not locked
            in memory)
            {
            if (there is a sleeping process)
            choose process such that priority + residence time
            is numerically highest;
            else
            // no sleeping process
            choose process such that residence time + nice is
            numerically highest;
            if (chosen process not sleeping or residency requirements not
            satisfied)
            sleep (event must swap process in);
            ---2M
            else
            swap out process;
            goto loop;
            // goto loop2 in revised algorithm given later
            }`}
        </code>
        The swapper tries to swap out sleeping processes rather than
        ready-to-run processes, because ready-to-run processes might get
        scheduled earlier than sleeping processes. A ready-to-run process must
        be core resident for at least 2 seconds before being swapped out, and a
        process to be swapped in must have been swapped out for at least 2
        seconds.
        <br />
        <br />
        If the swapper cannot find a processes to swap out or if neither the
        process to be swapped in nor the process to be swapped out have
        accumulated more than 2 seconds residence time in their environment,
        then swapper sleeps on the event that it wants to swap a process into
        memory but cannot find room for it. The clock will awaken the swapper
        once a second in that state. The kernel also awakens swapper if another
        process goes to sleep, since it may be more eligible for swapping out
        than the processes previously considered by the swapper. In any case,
        the swapper wakes up and begins execution from the beginning, attempting
        to swap in eligible processes.
        <br />
        <br />
        Here is an example of process scheduling in a system where A, B, C, D
        are same sized processes and only 2 processes can stay in main memory.
        This is the scheduling timeline:
        <img src={i16} alt='img16' width={450} /> <br />
        The swapper chooses processes to swap in based on the amount of time the
        processes had been swapped out. Another criterion could have been to
        swap in the highest- priority process that is ready to run, since such
        processes deserve a better chance to execute. It has been demonstrated
        that such a policy results in "slightly" better throughput under heavy
        system load.
        <br />
      </>
    ),
  },
  {
    question: (
      <>
        a) Some UNIX systems have a vfork system call that creates a new process
        but requires that the child does not return from the function that
        called vfork and that it invokes only the exit or execve system calls.
        Why is this curious system call a useful addition? How and why do modern
        CPUs reduce the need for vfork? <br /> <br />
        b) Give a solution to deallocate the swap space on the disk in detail.
      </>
    ),
    answer: (
      <>
        a) The restrictions imposed by the vfork system call mean that the child
        process can initially share its address space with its parent, rather
        than requiring that the OS makes a copy .the time spent doing that copy
        would be wasted if the child performs an exit or execve system call soon
        after. Vfork is less important in modern systems that support copy on
        write.
        <br />
        <br />
        The fork system call may initially appear more complex to use because it
        makes loading and executing a program in a new process a two-stage
        operation first of all forking a new process and then using execve to
        load and execute the specified program. The benefit of this is that fork
        can be used to create hierarchies of co-operating processes from the
        same executable image (i.e. when fork is not followed by execve) whereas
        a simple create process operation could only load and execute files that
        can be named
        <br />
        <br />
        b) <strong>Swap-SpaceManagement</strong> <br />
        Swap-Swap management is another low-level task pf the operating system.
        Disk space is used as an extension of main memory by the virtual memory.
        As we know the fact that disk access is much slower than memory access,
        In the swap-space management we are using disk space, so it will
        significantly decreases system performance. Basically, in all our
        systems we require the best throughput, so the goal of this swap-space
        implementation is to provide the virtual memory the best throughput. In
        these article, we are going to discuss how swap space is used, where
        swap space is located on disk, and how swap space is managed.
        <strong>Swap-SpaceUse:</strong>
        <br />
        Swap-space is used by the different operating-system in various ways.
        The systems which are implementing swapping may use swap space to hold
        the entire process which may include image, code and data segments.
        Paging systems may simply store pages that have been pushed out of the
        main memory. The need of swap space on a system can vary from a
        megabytes to gigabytes but it also depends on the amount of physical
        memory, the virtual memory it is backing and the way in which it is
        using the virtual memory.
        <br />
      </>
    ),
  },
  {
    question: (
      <>
        a) KERNBASE limits the amount of memory a single process can use, which
        might be irritating on a machine with a full 4 GB of RAM. Would raising
        KERNBASE allow a process to use more memory?
        <br />
        <br />
        b) How does the kernel ensure consistency of the TLB and the virtual
        address cache during an exec system call? Since the UNIX kernel is
        nonpaged, what could lead to a change in a TLB entry for a kernel page?
      </>
    ),
    answer: (
      <>
        a) The answer to this question is no, since the whole mechanism around
        xv6 is designed to work with KERNBASE on a specific address space. xv6
        can work with both higher and lower KERNBASE values. We can test this by
        changing KERNBASE to, say, 0x90000000 and then changing the relevant
        value in kernel.ld (the linker script which puts things in expected
        addresses). The real issue here, is that xv6 doesn't do any paging to
        disk. Now, in xv6 addresses 0x80000000 (KERNBASE) and up map linearly to
        0x00000000..0xffffffff. This means that any byte of memory you allocate
        in the whole system maps to 2 different physical addresses in 32-bit
        space. Since xv6 does no paging to disk, this means that if it allocates
        memory for the user process (using the sbrk() system call, used by
        malloc() in userspace), then it keeps it around in memory the whole
        time. So again, since we have 2 "copies", or more precisely 2 mappings
        to the same address, we can't ever actually use more than half the
        memory available in 32-bit address space. Now, recall that KERNBASE is
        defined as 0x80000000, which is exactly that: half of the available
        memory. So no, raising KERNBASE under these conditions can't give us
        more userspace memory.
        <br />
        <br />
        b) As a general rule, any process switch implies changing the set of
        active Page Tables. Local TLB entries relative to the old Page Tables
        must be flushed; this is done automatically when the kernel writes the
        address of the new Page Global Directory into the cr3 control register.
        In some cases, however, the kernel succeeds in avoiding TLB flushes,
        which are listed here:
        <LD
          options={[
            "When performing a process switch between two regular processes that use the same set of Page Tables",
            "When performing a process switch between a regular process and a kernel thread.",
          ]}
        />
        Kernel threads do not have their own set of Page Tables; rather, they
        use the set of Page Tables owned by the regular process that was
        scheduled last for execution on the CPU.
        <br />
        Beside process switches, there are other cases in which the kernel needs
        to flush some entries in a TLB. For instance, when the kernel assigns a
        page frame to a User Mode process and stores its physical address into a
        Page Table entry, it must flush any local TLB entry that refers to the
        corresponding linear address. On multiprocessor systems, the kernel must
        also flush the same TLB entry on the CPUs that are using the same set of
        Page Tables, if any.
        <br />
        <br />
        To invalidate TLB entries, the kernel uses the following functions and
        macros:
        <br />
        flush tlb one
        <br />
        Invalidates the local TLB entry of the page, including the specified
        address.
        <br />
        flush tlb page
        <br />
        To avoid useless TLB flushing in multiprocessor systems, the kernel uses
        a technique called lazy TLB mode. The basic idea is if several CPUs are
        using the same Page Tables and a TLB entry must be flushed on all of
        them, then TLB flushing may, in some cases, be delayed on CPUs running
        kernel threads.
        <br />
      </>
    ),
  },
  {
    question: (
      <>
        a) In xv6, explain first address space using Paging. Illustrate creating
        and running first process.
        <br />
        <br />
        b) For a given virtual address in a binary number, write and explain OS
        Handled translation lookaside buffer control flow algorithm
      </>
    ),
    answer: (
      <>
        a) main calls kvmalloc (1840) to create and switch to a page table with
        the mappings above KERNBASE required for the kernel to run. Most of the
        work happens in setupkvm (1818). It first allocates a page of memory to
        hold the page directory. Then it calls mappages to install the
        translations that the kernel needs, which are described in the kmap
        (1809) array. The translations include the kernel’s instructions and
        data, physical memory up to PHYSTOP, and memory ranges which are
        actually I/O devices. setupkvm does not install any mappings for the
        user memory; this will happen later.mappages (1760) installs mappings
        into a page table for a range of virtual addresses to a corresponding
        range of physical addresses. It does this separately for each virtual
        address in the range, at page intervals. For each virtual address to be
        mapped, mappages calls walkpgdir to find the address of the PTE for that
        address. It then initializes the PTE to hold the relevant physical page
        number, the desired permissions ( PTE_W and/or PTE_U), and PTE_P to mark
        the PTE as valid (1772). walkpgdir (1735) mimics the actions of the x86
        paging hardware as it looks up the PTE for a virtual address. walkpgdir
        uses the upper 10 bits of the virtual address to find the page directory
        entry (1740). If the page directory entry isn’t present, then the
        required page table page hasn’t yet been allocated; if the alloc
        argument is set, walkpgdir allocates it and puts its physical address in
        the page directory. Finally it uses the next 10 bits of the virtual
        address to find the address of the PTE in the page table page (1753)
        <br />
        <img src={i17} alt='img17' />
        <br />
        <img src={i18} alt='img18' />
        <br />
        <br />
        b) For a given virtual address in a binary number, write and explain OS
        Handled translation lookaside buffer control flow algorithm
        <LD
          type='ol'
          options={[
            "VPN = (VirtualAddress & VPN_MASK) >> SHIFT",
            "(Success, TlbEntry) = TLB_Lookup(VPN)",
            "if (Success == True) // TLB Hit",
            <>&emsp;if (CanAccess(TlbEntry.ProtectBits) == True)</>,
            <>&emsp;&emsp;Offset = VirtualAddress & OFFSET_MASK</>,
            <>&emsp;&emsp;PhysAddr = (TlbEntry.PFN {"<<"} SHIFT) | Offset</>,
            <>&emsp;&emsp;Register = AccessMemory(PhysAddr)</>,
            <>&emsp;else</>,
            <>&emsp;&emsp;RaiseException(PROTECTION_FAULT)</>,
            "else",
            "PTEAddr = PTBR + (VPN * sizeof(PTE))",
            "PTE = AccessMemory(PTEAddr)",
            "if (PTE.Valid == False)",
            <>&emsp;RaiseException(SEGMENTATION_FAULT)</>,
            "else if (CanAccess(PTE.ProtectBits) == False)",
            <>&emsp;RaiseException(PROTECTION_FAULT)</>,
            "else",
            <>&emsp;TLB_Insert(VPN, PTE.PFN, PTE.ProtectBits)</>,
            <>&emsp;RetryInstruction()</>,
          ]}
        />
        <strong>TLB Control Flow Algorithm</strong>
        <br />
        The algorithm the hardware follows works like this: first, extract the
        virtual page number (VPN) from the virtual address (Line 1), and check
        if the TLB holds the translation for this VPN (Line 2). If it does, we
        have a TLB hit, which means the TLB holds the translation.Success! We
        can now extract the page frame number (PFN) from the relevant TLB entry,
        concatenate that onto the offset from the original virtual address, and
        form the desired physical address (PA), and access memory (Lines 5–7),
        assuming protection checks do not fail (Line 4). If the CPU does not
        find the translation in the TLB (a TLB miss), we have some more work to
        do. In this example, the hardware accesses the page table to find the
        translation (Lines 11–12), and, assuming that the virtual memory
        reference generated by the process is valid and accessible (Lines 13,
        15), updates the TLB with the translation (Line 18). These set of
        actions are costly, primarily because of the extra memory reference
        needed to access the page table (Line 12). Finally, once the TLB is
        updated, the hardware retries the instruction; this time, the
        translation is found in the TLB, and the memory reference is processed
        quickly. <br /> <br />
        The TLB, like all caches, is built on the premise that in the common
        case, translations are found in the cache (i.e., are hits). If so,
        little overhead is added, as the TLB is found near the processing core
        and is designed to be quite fast. When a miss occurs, the high cost of
        paging is incurred; the page table must be accessed to find the
        translation, and an extra memory reference (or more, with more complex
        page tables) results. If this happens often, the program will likely run
        noticeably more slowly; memory accesses, relative tomost CPU
        instructions, are quite costly, and TLB misses lead to more memory
        accesses. Thus, it is our hope to avoid TLB misses as much as we can.
      </>
    ),
  },
  {
    question: (
      <>
        a) Consider a three-level page table organization as shown in the figure
        below. If a program is 4 Giga bytes, what is the total space needed for
        its page table (that is, the total space needed by directories and
        partial page tables)?
        <br /> <br />
        b) If you have to design a virtual memory management with demand paging,
        please design an algorithm to manipulate the hash frame table for the
        used frames.
      </>
    ),
    answer: (
      <>
        a) The last 12 bits of the virtual address are the offset in a page,
        varying from 0 to 4095. So the page size is 4096, that is, 4K. <br />
        <br />
        b) Virtual Memory is a storage allocation scheme in which secondary
        memory can be addressed as though it were part of main memory. The
        addresses a program may use to reference memory are distinguished from
        the addresses the memory system uses to identify physical storage sites,
        and program generated addresses are translated automatically to the
        corresponding machine addresses. The size of virtual storage is limited
        by the addressing scheme of the computer system and amount of secondary
        memory is available not by the actual number of the main storage
        locations.
        <br />
        <br />
        It is a technique that is implemented using both hardware and software.
        It maps memory addresses used by a program, called virtual addresses,
        into physical addresses in computer memory.
        <LD
          type='ol'
          options={[
            "All memory references within a process are logical addresses that are dynamically translated into physical addresses at run time. This means that a process can be swapped in and out of main memory such that it occupies different places in main memory at different times during the course of execution.",
            "A process may be broken into number of pieces and these pieces need not be continuously located in the main memory during execution. The combination of dynamic run-time address translation and use of page or segment table permits this.",
          ]}
        />{" "}
        <br />
        If these characteristics are present then, it is not necessary that all
        the pages or segments are present in the main memory during execution.
        This means that the required pages need to be loaded into memory
        whenever required. Virtual memory is implemented using Demand Paging or
        Demand Segmentation.
        <br />
        <br />
        <strong>Demand Paging :</strong>
        <br />
        The process of loading the page into memory on demand (whenever page
        fault occurs) is known as demand paging.
        <br />
        The process includes the following steps :<br />
        <img src={i19} alt='img19' />
        <br />
        <LD
          type='ol'
          options={[
            "If CPU try to refer a page that is currently not available in the main memory, it generates an interrupt indicating memory access fault.",
            "The OS puts the interrupted process in a blocking state. For the execution to proceed the OS must bring the required page into the memory.",
            "The OS will search for the required page in the logical address space.",
            "The required page will be brought from logical address space to physical address space. The page replacement algorithms are used for the decision making of replacing the page in physical address space.",
            "The page table will updated accordingly.",
            "The signal will be sent to the CPU to continue the program execution and it will place the process back into ready state.",
          ]}
        />
        <strong>Hashed Page Tables :</strong>
        <br />
        In hashed page tables, the virtual page number in the virtual address is
        hashed into the hash table. They are used to handle address spaces
        higher than 32 bits. Each entry in the hash table has a linked list of
        elements hashed to the same location (to avoid collisions – as we can
        get the same value of a hash function for different page numbers). The
        hash value is the virtual page number. The Virtual Page Number is all
        the bits that are not a part of the page offset.
        <br />
        <br />
        For each element in the hash table, there are three fields
        <br />
        <LD
          type='ol'
          options={[
            "Virtual Page Number (which is the hash value).",
            "Value of the mapped page frame.",
            "A pointer to the next element in the linked list.",
          ]}
        />
        <img src={i20} alt='img20' />
        <br />
      </>
    ),
  },
  {
    question: (
      <>
        Express the reasons for insisting on doing these two actions: (1) test
        (or load) the content of a memory location and (2) set its value to one
        using one machine instruction, in order for this instruction to be
        useful in implementing mutual exclusion. List Locks in xv6.
      </>
    ),
    answer: (
      <>
        These two rules says when locks are necessary but say nothing about when
        locks are unnecessary. It is important for efficiency not to lock too
        much, because locks reduce parallelism. If parallelism isn’t important,
        then one could arrange to have only a single thread and not worry about
        locks. A simple kernel can do this on a multiprocessor by having a
        single lock that must be acquired on entering the kernel and released on
        exiting the kernel
        <br />
        Locks in xv6:
        <br />
        <LD
          options={[
            "xv6 has two types of locks: spin-locks and sleep-locks.",
            "xv6 represents a spin-lock as a struct spinlock.",
          ]}
        />
        Spin locks:
        <br />
        <LD
          options={[
            "The important field in the structure is locked",
            "a word that is zero when the lock is available and non-zero when it is held.",
            "Logically, xv6 should acquire a lock by executing code like",
            "Locks (i.e., spinlocks) in xv6 are implemented using the xchg atomic instruction",
            "xv6 uses locks in many places to avoid race conditions",
            "A hard part about using locks is deciding how many locks to use and which data and invariants each lock protects.",
            "There are a few basic principles.",
            "First, any time a variable can be written by one CPU at the same time that another CPU can read or write it, a lock should be introduced to keep the two operations from overlapping.",
            "Second, remember that locks protect invariants: if an invariant involves multiple memory locations, typically all of them need to be protected by a single lock to ensure the invariant is maintained.",
          ]}
        />
        <br />
        <br />
        Sleep locks:
        <br />
        <LD
          options={[
            "Sometimes xv6 code needs to hold a lock for a long time.",
            "For example, the file system keeps a file locked while reading and writing its content on the disk, and these disk operations can take tens of milliseconds.",
            "Efficiency demands that the processor be yielded while waiting so that other threads can make progress, and this in turn means that xv6 needs locks that work well when held across context switches.",
            "xv6 provides such locks in the form of sleep-locks.",
            "Xv6 sleep-locks support yielding the processor during their critical sections.",
            "Because sleep-locks leave interrupts enabled, they cannot be used in interrupt handlers.",
            "Because acquiresleep may yield the processor, sleep-locks cannot be used inside spin-lock critical sections (though spin-locks can be used inside sleep-lock critical sections).",
            "xv6 uses spin-locks in most situations, since they have low overhead.",
            "It uses sleep-locks only in the file system, where it is convenient to be able to hold locks across lengthy disk operations",
          ]}
        />
      </>
    ),
  },
  {
    question: (
      <>
        Given that you can create multiple threads to perform different tasks
        within a program, explain why you might still need to use fork. List 5
        pthread functions.
      </>
    ),
    answer: (
      <>
        Fork is universally accepted than thread because of the following
        reasons:
        <br />
        Development is much easier on fork based implementations.
        <br />
        Fork based code a more maintainable.
        <br />
        Forking is much safer and more secure because each forked process runs
        in its own virtual address space. If one process crashes or has a buffer
        overrun, it does not affect any other process at all.
        <br />
        Threads code is much harder to debug than fork.
        <br />
        Fork are more portable than threads.
        <br />
        Forking is faster than threading on single cpu as there are no locking
        over-heads or context switching.
        <br />5 pthread functions:
        <br />
        <LD
          options={[
            "pthread_create: used to create a new thread.",
            "pthread_exit: used to terminate a thread.",
            "pthread_join: used to wait for the termination of a thread.",
            "pthread_self: used to get the thread id of the current thread",
            "pthread_equal: compares whether two threads are the same or not",
          ]}
        />
      </>
    ),
  },
  {
    question: (
      <>
        What three segments are usually found in the memory allocated to a
        process? Distinguish between an activation record and a stack frame.
        What is contained in a stack frame? How long does a stack frame last?
        Illustrate backtrace and Depict stack frames for a sample C program
        which call 3 user defined functions and malloc function.
      </>
    ),
    answer: (
      <>
        <strong>Text Segment:</strong>
        <br />
        The Text segment (a.k.a the Instruction segment) contains the executable
        program code and constant data. The text segment is marked by the
        operating system as read-only and can not be modified by the process.
        Multiple processes can share the same text segment. Processes share the
        text segment if a second copy of the program is to be executed
        concurrently. In this setting, the system references the previously
        loaded text segment with the pointer rather than reloading a duplicated.
        If needed, shared text, which is the default when using the C/C++
        compiler, can be turned off by using the -N option on the compile time.
        <br />
        <strong>Data Segment:</strong>
        The data segment, which is contiguous (in a virtual sense) with the text
        segment, can be subdivided into initialized data (e.g. in C/C++,
        variables that are declared as static or are static by virtual of their
        placement) and uninitialized (or 0-initizliazed) data. The uninitialized
        data area is also called BSS (Block Started By Symbol). For example,
        Initialized Data section is for initialized global variables or static
        variables, and BSS is for uninitialized. During its execution lifetime,
        a process may request additional data segment space. Library memory
        allocation routines (e.g., new, malloc, calloc, etc.) in turn make use
        of the system calls brk and sbrk to extend the size of the data segment.
        The newly allocated space is added to the end of the current
        uninitialized data area. This area of available memory is also called
        "heap". Generally speaking, you can call the whole data area as heap,
        but restrictly, people only refers the umapped area in the fig.
        <br />
        <strong>Stack Segment:</strong>
        <br />
        The stack segment is used by the process for the storage of automatic
        identifier, register variables, and function call information. In the
        above figure, the stack grows towards the uninitialized data segment.
        <br />
        <strong>
          Distinguish between an activation record and a stack frame?
        </strong>
        <br />
        <strong>stack frame:</strong>A stack frame is a memory management
        technique used in some programming languages for generating and
        eliminating temporary variables. In other words, it can be considered
        the collection of all information on the stack pertaining to a
        subprogram call. Stack frames are only existent during the runtime
        process. Stack frames help programming languages in supporting recursive
        functionality for subroutines.
        <br />A stack frame also known as an activation frame or activation
        record.
        <br />
        An Activation Record is a data structure that holds all the information
        needed to support one call of a function. It contains all the local
        variables of that function, and a reference (or pointer) to
        anotheractivation record; that pointer is known as the Dynamic Link.
        Stack Frames are an implementation of Activation Records. The dynamic
        link corresponds to the "saved FP" entry; it tells you which activation
        record to return to when the current function is finished. The frame
        pointer itself is simply a way of indicating which activation record is
        currently in use. The dynamic links tie all the activation records for a
        program together in one long linked list, showing the order they would
        appear in a stack.
        <br />
        <strong>How long does a stack frame last?</strong>
        <br />
        Local variables come and go at the whim of a running program. If a
        function is called resursively, many different versions of its local
        variables will exist at the same time, each having their own private
        allocation of memory. Local variables are kept on a Stack. Before a
        program starts, the Stack Pointer, a hardware CPU register that is
        reserved for pointing to the end of the stack, is set to point to the
        highest addresses available.
        <br />
        Every time a function is called, space is made on the stack for all of
        its local variables (plus a little extra) simply by subtracting from SP
        the number of bytes required. Usually at this point the new value of the
        stack pointer is copied into another reserved CPU register called the
        Frame Pointer. This allows the stack to still be used for saving
        temporary results, without losing track of our position.
        <br />
        <strong>What is contained in a stack frame?</strong>
        <br />
        The stack frame, also known as activation record is the collection of
        all data on the stack associated with one subprogram call.
        <br />
        <br />
        The stack frame generally includes the following components:
        <br />
        The return address <br />
        Argument variables passed on the stack <br />
        Local variables (in HLLs) <br />
        Saved copies of any registers modified by the subprogram that need to be
        restored (e.g. $s0 - $s8 in MAL).
        <br />
        <img src={i21} alt='img21' />
        <br />
      </>
    ),
  },
  {
    question: (
      <>
        Many systems classify library functions as thread-safe or thread-unsafe.
        What causes a function to be unsafe for use by a multithreaded
        application? Illustrate the implementation of concurrent linked list
        that only allows one thread to access any given node at any instant.
      </>
    ),
    answer: (
      <>
        Thread safety is the avoidance of data races--situations in which data
        are set to either correct or incorrect values, depending upon the order
        in which multiple threads access and modify the data. When no sharing is
        intended, give each thread a private copy of the data. When sharing is
        important, provide explicit synchronization to make certain that the
        program behaves in a deterministic manner. A procedure is thread safe
        when it is logically correct when executed simultaneously by several
        threads. At a practical level, it is convenient to recognize three
        levels of safety.
        <br />
        <LD
          options={[
            "Unsafe",
            "Thread safe - Serializable",
            "Thread safe - MT-Safe",
          ]}
        />
        <br />
        <strong>Unsafe:</strong>
        <br />
        An unsafe procedure can be made thread safe and serializable by
        surrounding it with statements to lock and unlock a mutex. The below
        example shows three simplified implementations of fputs() , initially
        thread unsafe.
        <br />
        <img src={i22} alt='img22' />
        <br />
        <strong>Thread safe – Serializable:</strong>
        <br />
        Next is a serializable version of this routine with a single mutex
        protecting the procedure from concurrent execution problems. Actually,
        this is stronger synchronization than is usually necessary. When two
        threads are sending output to different files using fputs() , one need
        not wait for the other--the threads need synchronization only when they
        are sharing an output file.
        <br />
        <br />
        <img src={i23} alt='img23' />
        <br />
        <strong>Thread safe - MT-Safe</strong>
        <br />
        The last version is MT-safe. It uses one lock for each file, allowing
        two threads to print to different files at the same time. So, a routine
        is MT-safe when it is thread safe and its execution does not negatively
        affect performance.
        <br />
        <img src={i24} alt='img24' />
        <br />
        Implementation of concurrent linked list:
        <br />
        <img src={i25} alt='img25' />
        <br />
        <img src={i26} alt='img26' />
        <br />
        <img src={i27} alt='img27' />
        <br />
      </>
    ),
  },
  {
    question: (
      <>
        a) Compare the IPC functionality provided by pipes and message queues.
        What are the advantages and drawbacks of each? When is one more suitable
        than the other? Illustrate message queue data structures by giving
        algorithm for msgget()
        <br />
        <br />
        b) Write a program to demonstrate deadlock using semaphores. How can the
        IPC_NOWAIT flag be used to prevent deadlocks when using semaphores?
        Illustrate system V semaphores data structures by giving algorithm for
        semget()
      </>
    ),
    answer: (
      <>
        a) <Table headers={["Pipes", "Message Queues are:"]} data={t1} />
        The biggest practical difference is that a pipe doesn't have the notion
        of "messages", it's just a pipe to write() bytes to and read() bytes
        from. The receiving end must have a way to know what piece of data
        constitute a "message" in your program, and you must implement that
        yourself. Furthermore the order of bytes is defined: bytes will come out
        in the order you put them in. And, generally speaking, it has one input
        and one output.
        <br />
        <br />A message queue is used to transfer "messages", which have a type
        and size. So, the receiving end can just wait for one "message" with a
        certain type, and you don't have to worry if this is complete or not.
        Several processes may send to and receive from the same queue.
        <br />
        <br />
        There are four system calls for messages: msgget returns (and possibly
        creates) a message descriptor that designates a message queue for use in
        other system calls, msgctl has options to set and return parameters
        associated with a message descriptor and an option to remove
        descriptors, msgsnd sends a message, and msgrcv receives a message.
        <br />
        <br />
        The syntax of the msgget system call is msgqid — msgget(key, flag);
        <br />
        <br />
        where msgqid is the descriptor returned by the call, and key and flag
        have the semantics described above for the general "get" calls. The
        kernel stores messages on a linked list (queue) per descriptor, and it
        uses msgqid as an index into an array of message queue headers. In
        addition to the general IPC permissions field mentioned above, the queue
        structure contains the following fields:
        <br />
        <LD
          options={[
            "Pointers to the first and last messages on a linked list.",
            "The number of messages and the total number of data bytes on the linked list.",
            "The maximum number of bytes of data that can be on the linked list.",
            "The process IDs of the last processes to send and receive messages.",
            "Time stamps of the last msgsnd, msgrcv, and msgctl operations.",
          ]}
        />
        <img src={i28} alt='img28' width={300} />
        <br />
        <br />
        b) implement the Producer & consumer Problem (Semaphore)
        <img src={i29} alt='img29' />
        IPC_NOWAIT, do not suspend but return an error if the Zero test fails or
        the P operation cannot be done. The IPC_NOWAIT and SEM_UNDO flags are
        important when claiming multiple resources at once.
        <br />
        <br />
        Specify SEM_UNDO on all operations; and specify IPC_NOWAIT on all but
        the first one. If the second or later resource is unavailable, semop()
        restores all preceding claims and returns an error code. As long as all
        processes or threads operate on semaphores in the same order, this logic
        prevents deadlocks, and it avoids long, fruitless suspensions.
        <br />
        <img src={i31} alt='img31' /> <br />
        The semaphore system calls are sem get to create and gain access to a
        set of semaphores, semai to do various control operations on the set,
        and semop to manipulate the values of semaphores.
        <br />
        The sem get system call creates an array of semaphores:
        <br />
        id = semget(key, count, flag);
        <br />
        where key, flag and id are similar to those parameters for messages and
        shared memory. The kernel allocates an entry that points to an array of
        semaphore structures with count elements (Figure 11.13). The entry also
        specifies the number of semaphores in the array, the time of the last
        semop call, and the time of the last semctl call. For example, the
        semget system call in Figure 11.14 creates a semaphore with two
        elements.
        <br />
        Processes manipulate semaphores with the semop system call:
        <br />
        oldval = semop(id, oplist, count);
        <br />
        Id is the descriptor returned by semget, oplist is a pointer to an array
        of semaphore operations, and count is the size of the array. The return
        value, oldval, is the value of the last semaphore operated on in the set
        before the operation was done. The format of each element of oplist is
        the semaphore number identifying the semaphore array entry being
        operated on, the operation, flags.
        <br />
        The kernel reads the array of semaphore operations, oplist , from the
        user address space and verifies that the semaphore numbers are legal and
        that the process has the necessary permissions to read or changethe
        semaphores. If permission is not allowed, the system call fails. If the
        kernel must sleep as it does the list of operations, it restores the
        semaphores it has already operated on to their values at the start of
        the system call; it sleeps until the event for which
        <br />
        <br />
        Algorithm for Semaphore Operation:
        <br />
        <img src={i30} alt='img30' /> <br />
        <img src={i32} alt='img32' /> <br />
      </>
    ),
  },
  {
    question: (
      <>
        a) How do condition variables avoid the lost wakeup problem? Give pseudo
        code to producer consumer problem using condition variables with
        multiple producer threads and single consumer thread.
        <br />
        <br />
        b) i) If Resource 1 has one slot, it is represented by R1 {"->"}
        <br /> 1. Given the following scenarios, determine if there is a dead
        lock by drawing a resource allocation graph. R1 {"->"} 2, R2 {"->"} 2,
        P1 holds R2 requesting R1, P2 holds R1, P3 holds R1 requesting R2, P4
        holds R2.
        <br /> ii) Considering a system with five processes P1 through P5 and
        three resources of type A, B, C. Resource type A has 10 instances, B has
        5 instances and type C has 7 instances. Suppose at time t0 following
        snapshot of the system has been taken:
        <br /> 1. what will be the content of the need matrix?
        <br /> 2. Is the system in a safe state? If yes then what is the safe
        sequence?
        <br /> 3. What will happen if process p3 requests one additional
        instance of resource type C and two instances of resource type A?
        <img src={i33} alt='img33' />
        <br />
      </>
    ),
    answer: (
      <>
        <strong>The Producer/Consumer Problem</strong>
        <br />
        This problem is one of the small collection of standard, well-known
        problems in concurrent programming: a finite-size buffer and two classes
        of threads, producers and consumers, put items into the buffer
        (producers) and take items out of the buffer (consumers).
        <br />A producer must wait until the buffer has space before it can put
        something in, and a consumer must wait until something is in the buffer
        before it can take something out.
        <br />A condition variable represents a queue of threads waiting for
        some condition to be signalled.
        <br />
        Example here, has two such queues, one (less) for producers waiting for
        a slot in the buffer, and the other (more) for consumers waiting for a
        buffer slot containing information. The example also has a mutex, as the
        data structure describing the buffer must be accessed by only one thread
        at a time.
        <br />
        <img src={i34} alt='img34' />
        <br />
        As shown, the producer thread acquires the mutex protecting the buffer
        data structure and then makes certain that space is available for the
        item being produced. If not, it calls pthread_cond_wait(), which causes
        it to join the queue of threads waiting for the condition less,
        representing there is room in the buffer, to be signaled.
        <br /> <br />
        At the same time, as part of the call to pthread_cond_wait(), the thread
        releases its lock on the mutex. The waiting producer threads depend on
        consumer threads to signal when the condition is true. When the
        condition is signaled, the first thread waiting on less is awakened.
        However, before the thread can return from pthread_cond_wait(), it must
        acquire the lock on the mutex again.
        <br />
        <br />
        This ensures that it again has mutually exclusive access to the buffer
        data structure. The thread then must check that there really is room
        available in the buffer; if so, it puts its item into the next available
        slot.
        <br />
        <br />
        At the same time, consumer threads might be waiting for items to appear
        in the buffer. These threads are waiting on the condition variable more.
        A producer thread, having just deposited something in the buffer, calls
        pthread_cond_signal () to wake up the next waiting consumer. (If there
        are no waiting consumers, this call has no effect.)
        <br />
        <br />
        Finally, the producer thread unlocks the mutex, allowing other threads
        to operate on the buffer data structure.
        <br />
        <img src={i35} alt='img35' />
        <br />
        Note the use of the assert () statement; unless the code is compiled
        with NDEBUG defined, assert () does nothing when its argument evaluates
        to true (that is, nonzero), but causes the program to abort if the
        argument evaluates to false (zero). Such assertions are especially
        useful in multithreaded programs--they immediately point out runtime
        problems if they fail, and they have the additional effect of being
        useful comments.
        <br />
        The comment that begins /* now: either b{"->"}occupied ... could better
        be expressed as an assertion, but it is too complicated as a
        Boolean-valued expression and so is given in English.
        <br />
        <br />
        Both the assertion and the comments are examples of invariants. These
        are logical statements that should not be falsified by the execution of
        the program, except during brief moments when a thread ismodifying some
        of the program variables mentioned in the invariant. (An assertion, of
        course, should be true whenever any thread executes it.)
        <br />
        <br />
        Using invariants is an extremely useful technique. Even if they are not
        stated in the program text, think in terms of invariants when you
        analyze a program.
        <br />
        <br />
        The invariant in the producer code that is expressed as a comment is
        always true whenever a thread is in the part of the code where the
        comment appears. If you move this comment to just after the
        mutex_unlock(), this does not necessarily remain true. If you move this
        comment to just after the assert(), this is still true.
        <br />
        <br />
        The point is that this invariant expresses a property that is true at
        all times, except when either a producer or a consumer is changing the
        state of the buffer. While a thread is operating on the buffer (under
        the protection of a mutex), it might temporarily falsify the invariant.
        However, once the thread is finished, the invariant should be true
        again.
        <br />
        <br />
        The code for the consumer. Its flow is symmetric with that of the
        producer.
        <br />
        <img src={i36} alt='img36' />
        <br />
        <br />
        Applying the Safety algorithm on the given system,
        <br />
        Step 1: Initialization Work = Available i.e. Work =3 3 2
        ……P1………P2……..P3……..P4……P5….. Finish = | false | false | false | false |
        false |<br />
        Step 2: For i=0 Finish[P0] = false and Need[P0]{"<="}Work i.e. (7 4 3)
        {"<="}(3 3 2) false So P0 must wait. Step 2: For i=1 Finish [P1] = false
        and Need[P1]{"<="}Work i.e. (1 2 2){"<="}(3 3 2) true So P1 must be kept
        in safe sequence.
        <br />
        Step 3: Work = Work + Allocation[P1] =(3 3 2)+(2 0 0)=(5 3 2)
        …….P0………P1…….P2…….P3… ...P4…… Finish = | false | true | false | false |
        false |
        <br />
        Step 4: For i=2 Finish[P2] = false and Need[P2]{"<="}Work i.e. (6 0 0)
        {"<="}(5 3 2)  false So P2 must wait. Step 2: For i=3 Finish[P3] =
        false and Need[P3]{"<="}Work i.e. (0 1 1){"<="}(5 3 2)  true So P3 must
        be kept in safe sequence. Step 3: Work = Work + Allocation[P3] = (5 3
        2)+(2 1 1)=(1 0 1) ……P1………P2……P3………..P4…….P5…. Finish = | false | true |
        false | true | false |
        <br />
      </>
    ),
  },
]

export const data = {
  "co-1": co1,
  "co-2": co2,
}
